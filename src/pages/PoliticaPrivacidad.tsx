import Layout from "@/components/Layout";

const PoliticaPrivacidad = () => (
  <Layout>
    <section className="section-padding bg-background">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-4">Política de Privacidad</h1>
        <div className="divider-wine !mx-0 mb-10" />

        <div className="prose prose-lg text-muted-foreground leading-relaxed space-y-8">
          {/* 1 */}
          <h2 className="font-serif text-2xl md:text-3xl text-charcoal !mt-12 !mb-6">1. Información al Usuario</h2>
          <p>
            JESÚS ORTIZ DE SOLÓRZANO, en adelante RESPONSABLE, es el Responsable del tratamiento de los datos personales del Usuario y le informa que estos datos serán tratados de conformidad con lo dispuesto en el Reglamento (UE) 2016/679 de 27 de abril (GDPR) y la Ley Orgánica 3/2018 de 5 de diciembre (LOPDGDD), por lo que se le facilita la siguiente información del tratamiento:
          </p>

          <h3 className="font-serif text-xl text-charcoal !mt-8 !mb-4">Fin del tratamiento</h3>
          <p>Mantener una relación comercial con el Usuario. Las operaciones previstas para realizar el tratamiento son:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Remisión de comunicaciones comerciales publicitarias por email, fax, SMS, MMS, comunidades sociales o cualquier otro medio electrónico o físico, presente o futuro, que posibilite realizar comunicaciones comerciales. Estas comunicaciones serán realizadas por el RESPONSABLE y relacionadas sobre sus productos y servicios, o de sus colaboradores o proveedores con los que éste haya alcanzado algún acuerdo de promoción. En este caso, los terceros nunca tendrán acceso a los datos personales.</li>
            <li>Realizar estudios estadísticos.</li>
            <li>Tramitar encargos, solicitudes o cualquier tipo de petición que sea realizada por el usuario a través de cualquiera de las formas de contacto que se ponen a su disposición.</li>
            <li>Remitir el boletín de noticias de la página web.</li>
          </ul>

          <h3 className="font-serif text-xl text-charcoal !mt-8 !mb-4">Base jurídica del tratamiento</h3>
          <p>Consentimiento del interesado.</p>

          <h3 className="font-serif text-xl text-charcoal !mt-8 !mb-4">Criterios de conservación de los datos</h3>
          <p>
            Se conservarán durante no más tiempo del necesario para mantener el fin del tratamiento y cuando ya no sea necesario para tal fin, se suprimirán con medidas de seguridad adecuadas para garantizar la seudonimización de los datos o la destrucción total de los mismos.
          </p>

          <h3 className="font-serif text-xl text-charcoal !mt-8 !mb-4">Comunicación de los datos</h3>
          <p>No se comunicarán los datos a terceros, salvo obligación legal.</p>

          <h3 className="font-serif text-xl text-charcoal !mt-8 !mb-4">Derechos que asisten al Usuario</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Derecho a retirar el consentimiento en cualquier momento.</li>
            <li>Derecho de acceso, rectificación, portabilidad y supresión de sus datos y a la limitación u oposición al su tratamiento.</li>
            <li>Derecho a presentar una reclamación ante la autoridad de control (<a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className="text-wine hover:underline">www.aepd.es</a>) si considera que el tratamiento no se ajusta a la normativa vigente.</li>
          </ul>

          <h3 className="font-serif text-xl text-charcoal !mt-8 !mb-4">Datos de contacto para ejercer sus derechos</h3>
          <p>
            Construcciones y Reformas Jesús Ortiz S.L.<br />
            El Cierzo, 31 – 26214 Cuzcurrita (La Rioja)<br />
            Email: <a href="mailto:info@tironcillo.com" className="text-wine hover:underline">info@tironcillo.com</a>
          </p>

          {/* 2 */}
          <h2 className="font-serif text-2xl md:text-3xl text-charcoal !mt-12 !mb-6">2. Carácter Obligatorio o Facultativo de la Información</h2>
          <p>
            Los Usuarios, mediante la marcación de las casillas correspondientes y entrada de datos en los campos marcados con un asterisco (*) en el formulario de contacto o presentados en formularios de descarga, aceptan expresamente y de forma libre e inequívoca, que sus datos son necesarios para atender su petición, por parte del prestador, siendo voluntaria la inclusión de datos en los campos restantes. El Usuario garantiza que los datos personales facilitados al RESPONSABLE son veraces y se hace responsable de comunicar cualquier modificación de los mismos.
          </p>
          <p>
            El RESPONSABLE informa y garantiza expresamente a los usuarios que sus datos personales no serán cedidos en ningún caso a terceros, y que siempre que realizara algún tipo de cesión de datos personales, se pedirá previamente el consentimiento expreso, informado e inequívoco por parte los Usuarios. Todos los datos solicitados a través del sitio web son obligatorios, ya que son necesarios para la prestación de un servicio óptimo al Usuario. En caso de que no sean facilitados todos los datos, no se garantiza que la información y servicios facilitados sean completamente ajustados a sus necesidades.
          </p>

          {/* 3 */}
          <h2 className="font-serif text-2xl md:text-3xl text-charcoal !mt-12 !mb-6">3. Medidas de Seguridad</h2>
          <p>
            De conformidad con lo dispuesto en las normativas vigentes en protección de datos personales, el RESPONSABLE está cumpliendo con todas las disposiciones de las normativas GDPR para el tratamiento de los datos personales de su responsabilidad, y manifiestamente con los principios descritos en el artículo 5 del GDPR, por los cuales son tratados de manera lícita, leal y transparente en relación con el interesado y adecuados, pertinentes y limitados a lo necesario en relación con los fines para los que son tratados.
          </p>
          <p>
            El RESPONSABLE garantiza que ha implementado políticas técnicas y organizativas apropiadas para aplicar las medidas de seguridad que establecen el GDPR con el fin de proteger los derechos y libertades de los Usuarios y les ha comunicado la información adecuada para que puedan ejercerlos.
          </p>
        </div>
      </div>
    </section>
  </Layout>
);

export default PoliticaPrivacidad;
