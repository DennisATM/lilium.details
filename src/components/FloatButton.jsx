import { Headphones, MessageCircle } from "lucide-react";

export const FloatButton = () => {
  return (
    <a
      href="https://wa.me/56990189842?text=Hola,+quiero+más+información+sobre+sus+productos" target="_blank" // 👉 cambia por el número real
      className="fixed bottom-5 right-5 bg-emerald-400 hover:bg-green-200 text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-transform transform hover:scale-110 z-50"
    >
      <div className="relative flex items-center">
        
        <Headphones className="w-6 h-6" />
        
        <MessageCircle className="w-3 h-3 absolute -top-1 -right-2 bg-white rounded-full" />
      </div>
    </a>
  );
};