import { useEffect } from 'react';
import '@/lib/ra-seal/styles.css';
import verifiedSvg from '@/lib/ra-seal/verified.svg';
import raLogoSvg from '@/lib/ra-seal/ra-logo.svg';

const RASeal = () => {
  useEffect(() => {
    const runSeal = () => {
      const t = {
        respData: {
          hasVerificada: true,
          shortname: 'libra-credito-solucoes-financeiras',
          companyName: 'Libra Crédito Soluções Financeiras',
        },
        bundleURL: '/', // Caminho base para os recursos
        widgetImageRoot: '/', // Será substituído abaixo
        widgetModel: 2,
        clientElementID: 'ra-verified-seal',
        raWidgeUID: parseInt(String(1 + 5e3 * Math.random())),
        TARGET_URL: 'https://www.reclameaqui.com.br/empresa/',
      };

      let e, r, i, a, n, o;
      if (Object.keys(t.respData).length > 0) {
        // As imagens agora são importadas diretamente
        t.widgetImageRoot = ''; // Não é mais necessário como um caminho de pasta

        r = '';
        a = '?utm_source=referral&utm_medium=embbed&utm_campaign=ra_verificada&utm_term=';
        if (2 === t.widgetModel) {
          r = 'width:136px;height:48px;overflow:hidden;';
          a += 'horizontal';
        } else {
          r = 'width:96px;height:95px;overflow:hidden;';
          a += 'vertical';
        }

        e = document.createElement('div');
        e.setAttribute('id', 'ra-widget-verified');
        e.setAttribute('style', r);
        r = t.TARGET_URL + t.respData.shortname + '/' + a;
        i = 'ra-widget-verified-' + String(t.raWidgeUID);
        a = t;
        n = ' ra-widget-verified-content ' + ('ra-widget-verified-' + String(a.raWidgeUID));
        o = '46px';
        if (2 === a.widgetModel) {
          n += ' horizontal';
          o = '32px';
        }

        n =
          '<div style="visibility: hidden;" class="' +
          n +
          '"><img importance="high" style="width:' +
          o +
          ';height:' +
          o +
          ';" class="ra-widget-verified-seal" src="' +
          verifiedSvg +
          '" alt="Selo RA Verificada" title="Selo RA Verificada" /><span class="ra-widget-verified-text">Verificada por</span><img importance="high" style="width:74px;height:13px;" class="ra-widget-logo" src="' +
          raLogoSvg +
          '" alt="Selo RA Verificada" title="Selo RA Verificada" /></div>';

        o = document.createElement('a');
        o.setAttribute('class', 'ra-widget-verified-wrapper');
        o.setAttribute('target', '_blank');
        o.setAttribute('title', 'Selo RA Verificada');
        o.setAttribute('href', r);
        o.innerHTML = n;
        e.appendChild(o);

        e.addEventListener('mousedown', function (ev) {
          if (ev.button != 0) {
            alert(
              (t.respData.companyName || 'Reclame AQUI') +
                ' informa: \nCópia proibida.\nO Selo de Reputação é de uso exclusivo de empresas cadastradas no Reclame AQUI.\nPara saber mais acesse: www.reclameaqui.com.br > Área da Empresa > Reputação'
            );
          }
        });

        e.addEventListener('contextmenu', function (ev) {
          ev.preventDefault();
          return false;
        });

        const container = document.getElementById(t.clientElementID);
        if (container) {
           // Limpa o container antes de adicionar o novo selo
           container.innerHTML = '';
           container.appendChild(e);
        }

        setTimeout(function () {
          var el = document.getElementsByClassName(i)[0];
          if (el) {
            el.classList.remove(i);
            el.classList.add('ra-verified-loaded');
          }
        }, 150);
      }
    };

    // Roda o script apenas no client-side
    if (typeof window !== 'undefined') {
      runSeal();
    }
  }, []);

  return <div id="ra-verified-seal" />;
};

export default RASeal;
