import { Typography } from "@mui/material";
import { useEffect } from "react";

const ContadorAcesso = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://contador.s12.com.br/ad.js?id=36z4bz06Z4z2WaDW";
    script.type = "text/javascript";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div style={{ textAlign: "center", display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '15px' }}>
      <Typography variant='caption' sx={{ display: 'block', mb: 1, fontSize: '15px' }}>
        Acessos:
      </Typography>
      <a href="https://contador.s12.com.br">
        <img
          src="https://contador.s12.com.br/img-36z4bz06Z4z2WaDW-15.gif"
          alt="contador de acesso"
          style={{ border: 0 }}
        />
      </a>
    </div>
  );
};

export default ContadorAcesso;