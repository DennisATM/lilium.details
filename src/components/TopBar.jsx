import { TruckIcon, EnvelopeIcon, PhoneIcon, ShoppingBagIcon } from "@heroicons/react/24/solid";

export const TopBar = () => {
    return (
        <div className="w-full bg-[#9cb56e] text-white text-xs sm:text-sm">
            <div className="mx-auto max-w-7xl px-4 py-2 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                    <TruckIcon className="h-4 w-4 text-shadow-xs" />
                    <span className="text-shadow-xs">Envíos a todo Chile</span>
                </div>
                <div className="hidden md:not-hidden md:flex items-center gap-2">
                    <ShoppingBagIcon className="h-4 w-4 text-shadow-xs" />
                    <span className="text-shadow-xs">Envío gratis por compras sobre $30000</span>
                </div>
                <div className="md:flex items-center gap-4 opacity-80">
                    <div className="flex items-center gap-1"><EnvelopeIcon className="h-4 w-4 text-shadow-xs" /><span className="text-shadow-xs">lilium.detalles26@gmail.com</span></div>
                    <div className="flex items-center gap-1"><PhoneIcon className="h-4 w-4 text-shadow-xs" /><span className="text-shadow-xs">+56 928505781</span></div>
                </div>
            </div>
        </div>
    );
}