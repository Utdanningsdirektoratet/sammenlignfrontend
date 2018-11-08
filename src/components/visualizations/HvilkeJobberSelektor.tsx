import React, { ChangeEvent } from "react";

type Props = {
  mainSelectRef: React.RefObject<HTMLSelectElement>;
  selected: string;
  onSelected: (event: ChangeEvent<HTMLSelectElement>) => void;
};

class HvilkeJobberSelektor extends React.Component<Props> {
  render() {
    const { mainSelectRef, selected, onSelected } = this.props;
    return (
      <div>
        <section>
          <select
            id="main_select"
            value={selected}
            ref={mainSelectRef}
            onChange={onSelected}
          >
            <option value="statsviter">Statsviter</option>
            <option value="idrettsfag">Idrettsfag</option>
            <option value="snekker">Snekker</option>
            <option value="akvakulturfag">Akvakulturfag</option>
            <option value="ambulansefag">Ambulansefag</option>
            <option value="apotekteknikkfag">Apotekteknikkfag</option>
            <option value="automatiseringsfag">Automatiseringsfag</option>
            <option value="betongfag">Betongfag</option>
            <option value="cncmaskineringsfag">CNC-maskineringsfag</option>
            <option value="dans">Dans</option>
            <option value="dataelektronikerfag">Dataelektronikerfag</option>
            <option value="drama">Drama</option>
            <option value="energimontørfag">Energimontørfag</option>
            <option value="helsesekretar">Helsesekretær</option>
            <option value="idrettsfag">Idrettsfag</option>
            <option value="iktservicefag">IKT-servicefag</option>
            <option value="industrimontorfag">Industrimontørfag</option>
            <option value="interior">Interiør</option>
            <option value="international_baccalaureate">
              International baccalaureate
            </option>
            <option value="kokkefag">Kokkefag</option>
            <option value="landbruksfag">Landbruksfag</option>
            <option value="matrosfag">Matrosfag</option>
            <option value="motormannfag">Motormannfag</option>
            <option value="naturbruk_studieforberedende">
              Naturbruk studieforberedende
            </option>
            <option value="produksjonsteknikkfag">Produksjonsteknikkfag</option>
            <option value="renholdsoperatorfag">Renholdsoperatørfag</option>
            <option value="snekker">Snekker</option>
            <option value="sveisefag">Sveisefag</option>
            <option value="tannhelsesekretar">Tannhelsesekretær</option>
            <option value="telemontorfag">Telemontørfag</option>
            <option value="anleggsmaskinforerfag">Anleggsmaskinførerfag</option>
            <option value="barne_ungdomsarbeiderfag">
              Barne og ungdomsarbeiderfag
            </option>
            <option value="bilfag_lette_kjoretoy">
              Bilfag, lette kjøretøy
            </option>
            <option value="elektrikerfag">Elektrikerfag</option>
            <option value="frisorfag">Frisørfag</option>
            <option value="helsearbeiderfag">Helsearbeiderfag</option>
            <option value="industrimekanikerfag">Industrimekanikerfag</option>
            <option value="logistikkfag">Logistikkfag</option>
            <option value="medier_kommunikasjon_studieforberedende">
              Medier og kommunikasjon (studieforberedende)
            </option>
            <option value="musikk">Musikk</option>
            <option value="pabygging">Påbygging</option>
            <option value="rorleggerfag">Rørleggerfag</option>
            <option value="salgsfag">Salgsfag</option>
            <option value="studiespesialisering_realfag">
              Studiespesialisering (realfag)
            </option>
            <option value="tømrerfag">Tømrerfag</option>
            <option value="yrkessjaforfag">Yrkessjåførfag</option>
          </select>
        </section>
      </div>
    );
  }
}

export default HvilkeJobberSelektor;
