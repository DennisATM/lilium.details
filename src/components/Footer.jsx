
import {
Instagram,
Facebook,
Youtube,
Mail,
Phone,
MapPin,
} from "lucide-react";


export const Footer = () => {
    return (
        <footer id="contacto" className="bg-green-100">
            <div className=" max-w-7xl px-4 py-12 grid gap-10 md:grid-cols-2">
                <div className="">
                    <div className="flex items-center gap-2">
                        <img src="./imgBases/logolilium.jpg" className="w-15 h-15 rounded-full" alt="" />
                        <span className="font-semibold tracking-wide text-xl md:text-2xl ms-madi-regular">Lilium Detalles</span>
                    </div>
                    <p className="mt-3 text-sm text-neutral-700 max-w-sm font-light">Fragancias artesanales para acompañar tus momentos. Calidad, diseño y calidez.</p>
                    <div className="mt-4 flex gap-3">
                        <a href="#" aria-label="Instagram" className="rounded-full shadow text-emerald-500 p-2 hover:bg-green-200"><Instagram className="h-4 w-4" /></a>
                        <a href="#" aria-label="Facebook" className="rounded-full shadow text-emerald-500 p-2 hover:bg-green-200"><Facebook className="h-4 w-4" /></a>
                        <a href="#" aria-label="YouTube" className="rounded-full shadow text-emerald-500 p-2 hover:bg-green-200"><Youtube className="h-4 w-4" /></a>
                    </div>
                </div>
                <div>
                    <h4 className="font-semibold">Contacto</h4>
                    <ul className="mt-3 space-y-2 text-sm text-neutral-700">
                        <li className="flex items-center gap-2 font-light"><Mail className="h-4 w-4" /> contacto@lilium.detalles.cl</li>
                        <li className="flex items-center gap-2 font-light"><Phone className="h-4 w-4" /> +56 9 9999 9999</li>
                        <li className="flex items-center gap-2 font-light"><MapPin className="h-4 w-4" /> Parral, Chile</li>
                    </ul>
                </div>
            </div>
            <div className="py-4 bg-green-200">
                <div className="mx-auto max-w-7xl px-4 text-xs sm:text-sm text-neutral-600 flex items-center justify-between">
                    <p>© {new Date().getFullYear()} Lilium Detalles. Todos los derechos reservados.</p>
                    <p>Desarrollado por <span className="font-bold">DXA Soluciones</span></p>
                </div>
            </div>
        </footer>
    );
}