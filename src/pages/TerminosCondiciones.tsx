import Layout from "@/components/Layout";

const TerminosCondiciones = () => (
  <Layout>
    <section className="section-padding bg-background">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-4">Términos y Condiciones</h1>
        <div className="divider-wine !mx-0 mb-10" />

        <div className="prose prose-lg text-muted-foreground leading-relaxed space-y-8">
          {/* Intro */}
          <h2 className="font-serif text-2xl md:text-3xl text-charcoal !mt-12 !mb-6">Condiciones de Contratación</h2>
          <p>
            Este documento contractual regirá la contratación de productos y servicios a través del sitio web riojaruralrooms.com, propiedad de CONSTRUCCIONES JESÚS ORTIZ, S.L., en adelante RIOJA RURAL ROOMS.
          </p>
          <p>La aceptación de este documento conlleva que el USUARIO:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Ha leído, entiende y comprende lo aquí expuesto.</li>
            <li>Es una persona con capacidad suficiente para contratar.</li>
            <li>Asume todas las obligaciones aquí dispuestas.</li>
          </ul>
          <p>
            Estas condiciones tendrán un periodo de validez indefinido y serán aplicables a todas las contrataciones realizadas a través del sitio web de riojaruralrooms.com.
          </p>
          <p>
            RIOJA RURAL ROOMS informa que el comercio es responsable y conoce la legislación vigente de los países a los que ofrece sus servicios y se reserva el derecho de modificar unilateralmente las condiciones, sin que ello pueda afectar a los bienes o promociones que fueron contratados previamente a la modificación.
          </p>

          {/* Condiciones de pago */}
          <h2 className="font-serif text-2xl md:text-3xl text-charcoal !mt-12 !mb-6">Condiciones de Pago</h2>

          <h3 className="font-serif text-xl text-charcoal !mt-8 !mb-4">Tarifa predeterminada</h3>
          <p>
            El cliente puede cancelar la reserva de forma gratuita hasta 7 días antes de la fecha de llegada. El cliente tendrá que pagar un 50% del precio total si cancela durante los 7 días antes de la fecha de llegada. Si cancela en las 48 horas previas a la llegada o no se presenta el día de la reserva, se cobrará el 100% del importe correspondiente a la reserva. Se paga durante el check in.
          </p>

          <h3 className="font-serif text-xl text-charcoal !mt-8 !mb-4">Tarifa no reembolsable</h3>
          <p>El cliente tendrá que pagar el precio total si cancela. Se paga por adelantado en el momento de realizar la reserva.</p>

          <h3 className="font-serif text-xl text-charcoal !mt-8 !mb-4">Suplemento late check in</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>De 00:00 a 23:00 → 10 €</li>
            <li>De 23:00 a 00:00 → 15 €</li>
            <li>A partir de las 00:00 → 25 €</li>
          </ul>

          <h3 className="font-serif text-xl text-charcoal !mt-8 !mb-4">Suplemento late check out</h3>
          <p>30 €</p>

          {/* Normas de ocupación */}
          <h2 className="font-serif text-2xl md:text-3xl text-charcoal !mt-12 !mb-6">Normas de Ocupación</h2>
          <p>
            Las tarifas se calculan por tipo de apartamento y el número de personas que lo ocupan. Imprescindible proporcionar esta información. En caso de que el número de ocupantes del apartamento no coincida con el indicado en la reserva, se actualizará la tarifa cobrando un suplemento del orden de 20 € por persona adicional/noche.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>No se realizará ningún descuento en el precio si se reduce el número de personas asistentes con respecto a la reserva.</li>
            <li>Los menores de 2 años se pueden alojar en cunas: 20 €/noche.</li>
            <li>No se admiten fiestas ni celebraciones en los apartamentos.</li>
            <li>No se permite fumar en ninguna de las estancias.</li>
          </ul>

          {/* Aparcamiento */}
          <h3 className="font-serif text-xl text-charcoal !mt-8 !mb-4">Aparcamiento</h3>
          <p>Hay aparcamiento público gratuito en las inmediaciones. No es necesario reservar.</p>

          {/* Check in / Check out */}
          <h2 className="font-serif text-2xl md:text-3xl text-charcoal !mt-12 !mb-6">Check in / Check out</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Entrada de 13:30 h a 23:00 h</li>
            <li>Salida hasta las 11:00 h</li>
            <li>Recogida de llaves: los apartamentos no disponen de recepción 24 horas. Para recoger las llaves de su apartamento pónganse en contacto con nosotros.</li>
            <li>Entrega de llaves: pónganse en contacto con nosotros.</li>
            <li>El horario de salida es antes de las 11:00. Una persona de la empresa se personará en su alojamiento a la hora pactada para comprobar el estado del apartamento y recoger las llaves.</li>
          </ul>

          {/* Condiciones de Salida */}
          <h2 className="font-serif text-2xl md:text-3xl text-charcoal !mt-12 !mb-6">Condiciones de Salida</h2>
          <p>
            A la hora pactada de salida del alojamiento, los inquilinos deben estar preparados y con las maletas hechas y el apartamento recogido y limpio. Usted debe entregar el alojamiento en las condiciones que lo encontró a su llegada.
          </p>

          {/* Daños */}
          <h2 className="font-serif text-2xl md:text-3xl text-charcoal !mt-12 !mb-6">Daños y Desperfectos</h2>
          <p>
            El cliente firmará una hoja de conformidad aportando el número de una tarjeta de crédito como garantía.
          </p>
          <p>
            El cliente, una vez termine su estancia en el apartamento, lo entregará en idénticas condiciones en las que lo encontró a su llegada (local, mobiliario, enseres y demás equipamiento).
          </p>
          <p>
            El cliente comunicará a la mayor brevedad posible los daños o desperfectos que se hayan producido en el alojamiento durante su estancia.
          </p>
          <p>
            Serán de cuenta del cliente la reparación de todos los daños y desperfectos que pudiera haber causado en el local, mobiliario, enseres y demás equipamiento por motivo de un uso inapropiado, así como la reposición por falta de algún elemento, o extravío de llaves (20 €).
          </p>
          <p>
            El cliente autoriza expresamente a la empresa Construcciones y Reformas Jesús Ortiz, S.L, a cargar en la tarjeta de crédito facilitada como garantía los daños y desperfectos causados. En ningún caso la empresa procederá a realizar ningún cargo en dicha tarjeta sin previa comunicación al cliente. La empresa no almacenará los datos de tarjeta de crédito aportados por el cliente.
          </p>

          {/* Mascotas */}
          <h2 className="font-serif text-2xl md:text-3xl text-charcoal !mt-12 !mb-6">Política de Mascotas</h2>
          <p>
            Se admiten mascotas bajo petición. Las mascotas deberán estar siempre acompañadas por sus dueños. No se permite dejarlas solas en los apartamentos, ni tampoco subirse a las camas ni a los sofás. La ropa de cama/toallas será de uso personal exclusivamente. Las toallas de baño y las sábanas por persona están incluidas en el precio del alquiler.
          </p>

          {/* Basura */}
          <h3 className="font-serif text-xl text-charcoal !mt-8 !mb-4">Basura</h3>
          <p>
            El huésped se hará cargo de tirar la basura que genera durante su estancia. El servicio de retirada de basura por el personal supondrá un recargo de 12 € que se cargarán a la tarjeta facilitada como garantía.
          </p>

          {/* Fianzas */}
          <h3 className="font-serif text-xl text-charcoal !mt-8 !mb-4">Fianzas</h3>
          <p>Actualmente no existe ningún tipo de fianza.</p>

          {/* Servicios extra */}
          <h3 className="font-serif text-xl text-charcoal !mt-8 !mb-4">Servicios extra</h3>
          <p>Actualmente no hay servicios extra.</p>

          {/* Responsabilidades */}
          <h2 className="font-serif text-2xl md:text-3xl text-charcoal !mt-12 !mb-6">Responsabilidades del Cliente</h2>
          <p>El cliente se compromete a respetar la normativa de la Comunidad. Durante las horas de descanso de 22:00 a 9:00.</p>
          <p>El uso de electricidad y agua debe ser racional.</p>
          <p>Los niños deberán ir siempre acompañados por sus padres y bajo su responsabilidad.</p>
          <p>
            La persona titular del contrato es la responsable del correcto comportamiento de todos sus ocupantes. En caso contrario, RIOJA RURAL ROOMS se reserva el derecho a expulsar a los ocupantes del alojamiento, sin derecho a futuras reclamaciones ni a ningún tipo de compensación.
          </p>
          <p>
            Ni RIOJA RURAL ROOMS, ni el propietario serán responsables de cualquier daño directo o indirecto que se pueda ocasionar como consecuencia del mal uso del alojamiento, incluidos sin limitación alguna: destrozos, pérdidas tras incendios, robos, delincuencia, accidentes u otros tipos de daños.
          </p>
        </div>
      </div>
    </section>
  </Layout>
);

export default TerminosCondiciones;
