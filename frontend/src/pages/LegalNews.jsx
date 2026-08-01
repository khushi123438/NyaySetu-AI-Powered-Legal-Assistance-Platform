import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Newspaper, Calendar, ExternalLink } from "lucide-react";

export default function LegalNews() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/news")
      .then((res) => res.json())
      .then((data) => {
        setArticles(data.articles || []);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <section className="relative py-20 px-6">

      <div className="max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .6 }}
          className="text-center mb-14"
        >

          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-400/20">

            <Newspaper className="text-cyan-400 w-5 h-5" />

            <span className="text-cyan-300 font-medium">
              Latest Updates
            </span>

          </div>

          <h2 className="mt-5 text-5xl font-black text-white">
            Legal News
          </h2>

          <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
            Stay informed with the latest legal developments,
            court judgments and law updates.
          </p>

        </motion.div>

        {loading ? (

          <div className="flex justify-center">

            <div className="h-14 w-14 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>

          </div>

        ) : (

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

            {articles.map((article, index) => (

              <motion.div
                key={index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * .08 }}
                whileHover={{
                  y: -8,
                  scale: 1.02
                }}
                className="overflow-hidden rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg"
              >

                <img
                  src={
                    article.urlToImage ||
                    "https://images.unsplash.com/photo-1589829545856-d10d557cf95f"
                  }
                  alt=""
                  className="h-56 w-full object-cover"
                />

                <div className="p-6">

                  <div className="flex items-center gap-2 text-cyan-300 text-sm mb-3">

                    <Calendar size={16} />

                    {new Date(article.publishedAt).toLocaleDateString()}

                  </div>

                  <h3 className="text-white text-xl font-bold line-clamp-2">

                    {article.title}

                  </h3>

                  <p className="text-slate-400 mt-4 line-clamp-3">

                    {article.description}

                  </p>

                  <a
                    href={article.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-cyan-500 text-white hover:bg-cyan-600 transition"
                  >

                    Read More

                    <ExternalLink size={18} />

                  </a>

                </div>

              </motion.div>

            ))}

          </div>

        )}

      </div>

    </section>
  );
}