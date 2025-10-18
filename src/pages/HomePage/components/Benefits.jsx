import {motion} from 'framer-motion';
import {
Leaf,
Sparkles,
Shield,
Flower
} from "lucide-react";

const fadeUp = {
hidden: { opacity: 0, y: 16 },
show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export const Benefits = () => {
    const items = [
        { icon: Leaf, title: "Velas", desc: "Renovable y de combustión limpia.",imgUrl:'./imgBases/soja.webp' },
        { icon: Sparkles, title: "Ambientadores", desc: "Fragancias duraderas y equilibradas.", imgUrl:'./imgBases/mano.png' },
        { icon: Shield, title: "Difusores", desc: " Llena tu hogar con fragancias suaves y duraderas", imgUrl:'./imgBases/difusores.jpg'},
        { icon: Flower, title: "Detalles", desc: "Para un momento especial.", imgUrl:'./imgBases/detalles.png'},
    ];
    return (

        <section className="bg-neutral-50 py-20">
            <div className="mx-auto grid max-w-7xl px-4 py-8 gap-6 md:grid-cols-4 text-black">
                {items.map(({ icon: Icon, title, desc, imgUrl }) => (
                <motion.div
                    key={title}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    className="relative rounded-3xl border p-6 shadow-sm overflow-hidden text-center"
                >
                    {/* Fondo con opacidad */}
                    <div
                    className="absolute inset-0 bg-cover bg-center opacity-50"
                    style={{ backgroundImage: `url(${imgUrl})` }}
                    ></div>

                    {/* Contenido por encima */}
                    <div className="relative z-10">
                    <Icon className="h-6 w-6 mx-auto mb-3 text-gray-800 text-shadow-xl" />
                    <h1 className="font-bold text-2xl text-gray-800">{title}</h1>
                    <p className="text-sm font-semibold text-gray-800 mt-2">{desc}</p>
                    </div>
                </motion.div>
                ))}
            </div>
        </section>
    );
}