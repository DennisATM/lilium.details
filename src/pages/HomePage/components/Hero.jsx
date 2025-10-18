import {motion} from 'framer-motion';
import {Link} from 'react-router-dom';
import {ArrowRight} from 'lucide-react';

export const Hero = () => {
    return (
        <section className="relative overflow-hidden">
            <div className="absolute inset-0 bg-cover opacity-80 bg-center" style={{ backgroundImage: "url(./imgBases/imgHeader.png" }} />
            <div className="relative mx-auto max-w-7xl px-4 py-28 sm:py-36 grid md:grid-cols-2 gap-8">
                <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-xl">
                    <span className="inline-block bg-[#6A8F6B] text-white px-3 py-1 rounded-2xl text-sm">Aromas & Bienestar</span>
                    <h1 className="mt-4 text-4xl text-[#C5D1C5] text-shadow-2xs text-shadow-[black] sm:text-5xl font-semibold leading-tight">Fragancias que transforman tus espacios</h1>
                    <p className="mt-4 text-[#C5D1C5] text-shadow-xs text-shadow-[black]">Velas de soja, difusores de caña y aromatizadores textiles creados con mezclas exquisitas y un enfoque sustentable.</p>
                    <div className="mt-6 flex flex-wrap gap-3">
                        <Link to="/shopee" className="rounded-2xl bg-[#6A8F6B] text-white px-4 py-2 hover:bg-[#A5BFA4] flex items-center gap-2">Explorar colección <ArrowRight className="h-4 w-4" /></Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}