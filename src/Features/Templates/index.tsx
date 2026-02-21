import { motion } from "framer-motion";
import { Eye, Wand2 } from "lucide-react";
import { Link } from "react-router";

const templates = [
  {
    id: 1,
    name: "Template 1",
    image: "Template1.png",
    link: "https://portfolio-template-mu-five.vercel.app/"
  },
];

const TemplatesPage = () => {
  return (
    <div
      className="min-h-screen pt-28 pb-20 px-4"
      style={{
        background:
          "linear-gradient(160deg, #f8f7ff 0%, #eef2ff 50%, #ede9fe 100%)",
      }}
    >
      {/* Decorative Blobs */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div
          className="absolute top-[-15%] left-[-10%] w-[45%] h-[45%] rounded-full blur-[130px] opacity-20"
          style={{ background: "radial-gradient(circle,#4f46e5,#7c3aed)" }}
        />
        <div
          className="absolute bottom-[-10%] right-[-10%] w-[35%] h-[35%] rounded-full blur-[100px] opacity-15"
          style={{ background: "radial-gradient(circle,#a855f7,#4f46e5)" }}
        />
      </div>

      <div className="container mx-auto max-w-6xl flex flex-col gap-16">
        {/* Header */}
        <div className="text-center space-y-4">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black uppercase tracking-[0.18em]"
            style={{
              background: "rgba(79,70,229,0.08)",
              border: "1px solid rgba(79,70,229,0.18)",
              color: "#4f46e5",
            }}
          >
            ✦ Premium Templates
          </div>

          <h1
            className="text-4xl sm:text-5xl font-black"
            style={{ color: "#1e1b4b" }}
          >
            Choose Your Template
          </h1>

          <p
            className="text-base font-bold"
            style={{ color: "#9ca3af" }}
          >
            Pick a modern design for your CV or portfolio
          </p>
        </div>

        {/* Templates Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template) => (
            <motion.div
              key={template.id}
              whileHover={{ y: -8 }}
              className="rounded-[2rem] overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.85)",
                backdropFilter: "blur(20px)",
                border: "1.5px solid rgba(79,70,229,0.10)",
                boxShadow: "0 20px 60px rgba(79,70,229,0.12)",
              }}
            >
              {/* Image */}
              <div className="relative group">
                <img
                  src={template.image}
                  alt={template.name}
                  className="w-full h-64 object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-4">
                  <Link to={template.link} target="_blank">
                  <button className="px-4 py-2 rounded-xl bg-white text-black font-bold flex items-center gap-2">
                    <Eye size={16} />
                    Preview
                  </button>
                  </Link>

                  <button
                    className="px-4 py-2 rounded-xl text-white font-bold flex items-center gap-2"
                    style={{
                      background:
                        "linear-gradient(135deg,#4f46e5,#7c3aed)",
                    }}
                  >
                    <Wand2 size={16} />
                    Use
                  </button>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 text-center">
                <h3
                  className="text-lg font-black"
                  style={{ color: "#1e1b4b" }}
                >
                  {template.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplatesPage;