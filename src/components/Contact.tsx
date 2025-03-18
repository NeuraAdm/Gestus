import React, { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Número de WhatsApp al que se enviará el mensaje (sin '+' y sin espacios)
    const phoneNumber = "573107186513"; // Usa el número que aparece en tu página

    // Crear el mensaje con toda la información del formulario
    const message = `
  *Nuevo contacto desde la web*
  *Nombre:* ${formData.name}
  *Email:* ${formData.email}
  *Teléfono:* ${formData.phone || "No proporcionado"}
  *Empresa:* ${formData.company || "No proporcionada"}
  *Mensaje:* ${formData.message}
    `.trim();

    // Codificar el mensaje para la URL
    const encodedMessage = encodeURIComponent(message);

    // Crear la URL de WhatsApp
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // Abrir WhatsApp en una nueva pestaña
    window.open(whatsappURL, '_blank');

    // Reiniciar el formulario
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      message: '',
  });
};

return(
  <section id="contact" className="py-16 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-2xl text-indigo-600 font-semibold tracking-wide uppercase bg-gradient-to-br from-blue-100 to-green-100 rounded-xl shadow-lg p-8">Contactanos</h2>
        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Con un solo click
        </p>
        <p className="mt-4 max-w-2xl text-2xl text-gray-600 lg:mx-auto">
          ¿Tienes alguna pregunta o necesitas más información? ¡Estamos aquí para ayudarte!
        </p>
      </div>

      <div className="mt-16 lg:grid lg:grid-cols-3 lg:gap-8">
        <div>
          <div className="space-y-8">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-800 text-white">
                  <Mail className="h-6 w-6" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Correo Electronico</h3>
                <p className="mt-2 text-base text-gray-500 font-bold">gestus.solucionesintegrales@gmail.com</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-800 text-white">
                  <Phone className="h-6 w-6" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Celular</h3>
                <p className="mt-2 text-base text-gray-500 font-bold">+57 3107186513 y +57 3147249770.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-800 text-white">
                  <MapPin className="h-6 w-6" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Direccion</h3>
                <p className="mt-2 text-base text-gray-500 font-bold">Carrera 7 #19-26, Edificio Torre Bolívar, Oficina 302, Pereira, Risaralda.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 lg:mt-0 lg:col-span-2">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
            <div>
              <label htmlFor="name" className="block text-xl font-medium text-gray-700">
                Nombre Completo
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md border"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-xl font-medium text-gray-700">
                Correo Electronico
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md border"
                />
              </div>
            </div>
            <div>
              <label htmlFor="phone" className="block text-xl font-medium text-gray-700">
                Numero de Contacto
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md border"
                />
              </div>
            </div>
            <div>
              <label htmlFor="company" className="block text-xl font-medium text-gray-700">
                Nombre de tu Compañia
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="company"
                  id="company"
                  autoComplete="organization"
                  value={formData.company}
                  onChange={handleChange}
                  className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md border"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="message" className="block text-xl font-medium text-gray-700">
                Mensaje
              </label>
              <div className="mt-1">
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md border"
                ></textarea>
              </div>
            </div>
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-xl font-medium text-white bg-gradient-to-r from-teal-600 to-green-500 hover:from-green-500 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 hover:-translate-y-1"
              >
                Enviar Mensaje
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
);
}

export default Contact;