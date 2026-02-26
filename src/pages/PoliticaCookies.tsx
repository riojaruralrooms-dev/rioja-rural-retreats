import Layout from "@/components/Layout";

const PoliticaCookies = () => (
  <Layout>
    <section className="section-padding bg-background">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-4">Política de Cookies</h1>
        <p className="text-sm text-muted-foreground mb-2">Última actualización: 26 de febrero de 2026</p>
        <div className="divider-wine !mx-0 mb-10" />

        <div className="prose prose-lg text-muted-foreground leading-relaxed space-y-8">
          {/* 1 */}
          <h2 className="font-serif text-2xl md:text-3xl text-charcoal !mt-12 !mb-6">1. Introducción</h2>
          <p>
            Nuestra web, <a href="https://riojaruralrooms.com" className="text-wine hover:underline">https://riojaruralrooms.com</a> (en adelante: «la web»), utiliza cookies y otras tecnologías relacionadas (para mayor comodidad, todas las tecnologías se denominan «cookies»). Las cookies también pueden ser colocadas por terceros a los que hemos contratado. En el siguiente documento te informamos sobre el uso de cookies en nuestra web.
          </p>

          {/* 2 */}
          <h2 className="font-serif text-2xl md:text-3xl text-charcoal !mt-12 !mb-6">2. ¿Qué son las cookies?</h2>
          <p>
            Una cookie es un pequeño archivo que se envía junto con las páginas de esta web y que tu navegador almacena en el disco duro de tu ordenador u otro dispositivo. La información almacenada puede ser devuelta a nuestros servidores o a los servidores de terceros apropiados durante una visita posterior.
          </p>

          {/* 3 */}
          <h2 className="font-serif text-2xl md:text-3xl text-charcoal !mt-12 !mb-6">3. ¿Qué son los scripts?</h2>
          <p>
            Un script es un fragmento de código de programa que se utiliza para hacer que nuestra web funcione correctamente y de forma interactiva. Este código se ejecuta en nuestro servidor o en tu dispositivo.
          </p>

          {/* 4 */}
          <h2 className="font-serif text-2xl md:text-3xl text-charcoal !mt-12 !mb-6">4. ¿Qué es una baliza web?</h2>
          <p>
            Una baliza web (o etiqueta de píxel) es una pequeña e invisible pieza de texto o imagen en una web que se utiliza para monitorear el tráfico en una web. Para ello, se almacenan diversos datos mediante estas balizas web.
          </p>

          {/* 5 */}
          <h2 className="font-serif text-2xl md:text-3xl text-charcoal !mt-12 !mb-6">5. Tipos de Cookies</h2>

          <h3 className="font-serif text-xl text-charcoal !mt-8 !mb-4">5.1 Cookies técnicas o funcionales</h3>
          <p>
            Algunas cookies aseguran que ciertas partes de la web funcionen correctamente y que tus preferencias de usuario sigan recordándose. Al colocar cookies funcionales, te facilitamos la visita a nuestra web. De esta manera, no necesitas introducir repetidamente la misma información cuando visitas nuestra web. Podemos colocar estas cookies sin tu consentimiento.
          </p>

          <h3 className="font-serif text-xl text-charcoal !mt-8 !mb-4">5.2 Cookies de estadísticas</h3>
          <p>
            Utilizamos cookies estadísticas para optimizar la experiencia de la web para nuestros usuarios. Con estas cookies estadísticas obtenemos información sobre el uso de nuestra web. Te pedimos tu permiso para colocar cookies de estadísticas.
          </p>

          <h3 className="font-serif text-xl text-charcoal !mt-8 !mb-4">5.3 Cookies de marketing/seguimiento</h3>
          <p>
            Las cookies de marketing o seguimiento son cookies, o cualquier otra forma de almacenamiento local, utilizadas para crear perfiles de usuario con el objetivo de mostrar publicidad o para hacer el seguimiento del usuario en esta web o en varias webs con fines de marketing similares.
          </p>

          <h3 className="font-serif text-xl text-charcoal !mt-8 !mb-4">5.4 Redes sociales</h3>
          <p>
            En nuestra web hemos incluido contenido para promover páginas web o compartir contenido en redes sociales. Este contenido está incrustado con código derivado de terceros y puede guardar cookies. Este contenido podría procesar cierta información para anuncios personalizados. Te recomendamos leer la política de privacidad de estas redes sociales para saber qué hacen con tus datos personales.
          </p>

          {/* 6 */}
          <h2 className="font-serif text-2xl md:text-3xl text-charcoal !mt-12 !mb-6">6. Cookies Usadas</h2>
          <div className="overflow-x-auto rounded-sm border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-secondary/40">
                  <th className="py-3 px-4 text-left font-medium text-charcoal">Cookie</th>
                  <th className="py-3 px-4 text-left font-medium text-charcoal">Tipo</th>
                  <th className="py-3 px-4 text-left font-medium text-charcoal">Función</th>
                  <th className="py-3 px-4 text-left font-medium text-charcoal">Caducidad</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["_grecaptcha", "Funcional", "Protección contra spam", "Sesión"],
                  ["rc::c", "Funcional", "Filtrar solicitudes de bots", "Sesión"],
                  ["rc::b", "Funcional", "Filtrar solicitudes de bots", "Sesión"],
                  ["rc::a", "Funcional", "Filtrar solicitudes de bots", "Persistente"],
                  ["_ga / _utm", "Estadísticas", "Análisis estadístico (Google Analytics)", "2 años"],
                ].map(([name, type, fn, exp]) => (
                  <tr key={name} className="border-t border-border">
                    <td className="py-2.5 px-4 font-mono text-xs">{name}</td>
                    <td className="py-2.5 px-4">{type}</td>
                    <td className="py-2.5 px-4">{fn}</td>
                    <td className="py-2.5 px-4">{exp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 9 */}
          <h2 className="font-serif text-2xl md:text-3xl text-charcoal !mt-12 !mb-6">7. Consentimiento</h2>
          <p>
            Cuando visites nuestra web por primera vez, te mostraremos una ventana emergente con una explicación sobre las cookies. Tan pronto como hagas clic en «Guardar preferencias», aceptas que usemos las categorías de cookies seleccionadas en la ventana emergente, tal y como se describe en esta política de cookies.
          </p>
          <p>
            Puedes desactivar el uso de cookies a través de tu navegador, pero ten en cuenta que nuestra web puede dejar de funcionar correctamente.
          </p>

          <h3 className="font-serif text-xl text-charcoal !mt-8 !mb-4">Categorías de consentimiento</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Funcional:</strong> Siempre activo</li>
            <li><strong>Estadísticas:</strong> Requiere consentimiento</li>
            <li><strong>Marketing:</strong> Requiere consentimiento</li>
          </ul>

          {/* 10 */}
          <h2 className="font-serif text-2xl md:text-3xl text-charcoal !mt-12 !mb-6">8. Activación/Desactivación y Borrado de Cookies</h2>
          <p>
            Puedes utilizar tu navegador para eliminar las cookies de forma automática o manual. También puedes especificar que ciertas cookies no puedan ser colocadas. Otra opción es cambiar los ajustes de tu navegador para recibir un aviso cada vez que se coloque una cookie.
          </p>

          {/* 11 */}
          <h2 className="font-serif text-2xl md:text-3xl text-charcoal !mt-12 !mb-6">9. Tus Derechos</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Derecho a saber por qué se necesitan tus datos personales y durante cuánto tiempo se conservarán.</li>
            <li>Derecho de acceso a tus datos personales.</li>
            <li>Derecho de rectificación, eliminación o limitación del tratamiento.</li>
            <li>Derecho a retirar el consentimiento.</li>
            <li>Derecho a la portabilidad de los datos.</li>
            <li>Derecho de oposición al tratamiento.</li>
          </ul>
          <p>
            Puedes ejercer estos derechos contactando con nosotros. También tienes derecho a presentar una reclamación ante la autoridad de protección de datos correspondiente.
          </p>

          {/* 12 */}
          <h2 className="font-serif text-2xl md:text-3xl text-charcoal !mt-12 !mb-6">10. Datos de Contacto</h2>
          <p>
            <strong>RIOJA RURAL ROOMS</strong><br />
            Cuzcurrita de Río Tirón (La Rioja), España<br />
            Web: <a href="https://riojaruralrooms.com" className="text-wine hover:underline">https://riojaruralrooms.com</a><br />
            Correo electrónico: <a href="mailto:riojaruralrooms@gmail.com" className="text-wine hover:underline">riojaruralrooms@gmail.com</a>
          </p>
        </div>
      </div>
    </section>
  </Layout>
);

export default PoliticaCookies;
