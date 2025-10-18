import {motion} from 'framer-motion';
import { ContainerSvg } from "./ContainerSvg.jsx";

const fadeUp = {
hidden: { opacity: 0, y: 16 },
show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export const About = ()  => {
    return (
        <section id="nosotros" className="bg-[#C2CBB1]">
            <div className="py-3 max-w-7xl mx-4 md:mx-0 grid md:grid-cols-2 gap-20 items-center">
                
                <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="order-1 md:order-2">
                    <span className="inline-block bg-[#6A8F6B] text-white px-3 py-1 rounded-2xl text-sm">Nuestra esencia</span>
                    <h2 className="mt-4 text-3xl font-semibold">Descubre un nuevo mundo de aromas</h2>
                    <p className="mt-3 text-neutral-700">Disfruta de todos nuestros productos exclusivos de aromaterapia y transforma tu hogar en un santuario de paz.</p>
                </motion.div>
                
                {/* <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="relative order-2 md:order-1 w-full">
                    <div className="aspect-[4/5] overflow-hidden">
                        <img src="./imgBases/melts.png" alt="imagen melts" className="h-full w-full m-0 p-0 object-cover" />
                    </div>
                </motion.div> */}
                <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="relative order-2 md:order-1 w-full">
                    <ContainerSvg />
                </motion.div> 
            </div>
    </section>
    );
}