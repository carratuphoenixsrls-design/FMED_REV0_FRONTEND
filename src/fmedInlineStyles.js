/* FMED Enterprise 1.0 · E8.2.3 Visual Final Polish
   Registro inline consolidato: ogni proprietà visuale è definita una sola volta.
   Il risultato runtime è identico al registro E8.2.0 risolto prima del consolidamento. */

const styles = {
  "fmedThemeToggleBtn": {
    "height": "42px",
    "minHeight": 42,
    "padding": "10px 14px",
    "borderRadius": 999,
    "display": "inline-flex",
    "alignItems": "center",
    "justifyContent": "center",
    "gap": 8,
    "fontSize": "12px",
    "fontWeight": 500,
    "letterSpacing": "0.08em",
    "textTransform": "uppercase",
    "cursor": "pointer",
    "whiteSpace": "nowrap",
    "transition": "transform .18s ease, box-shadow .18s ease, background .18s ease",
    "border": "1px solid var(--fmed-d3-border)",
    "background": "var(--fmed-d3-pill)",
    "color": "var(--fmed-d3-text)",
    "boxShadow": "none"
  },
  "fmedThemeToggleBtnDark": {
    "background": "rgba(255,255,255,.08)",
    "color": "#F7F9FB",
    "border": "1px solid rgba(31,174,156,.24)",
    "boxShadow": "0 12px 30px rgba(0,0,0,.16)"
  },
  "fmedThemeToggleBtnLight": {
    "background": "var(--fmed-btn)",
    "color": "#FFFFFF",
    "border": "1px solid rgba(7,128,147,.22)",
    "boxShadow": "var(--fmed-btn-shadow)"
  },
  "fmedThemeToggleIcon": {
    "fontSize": "15px",
    "lineHeight": 1
  },
  "emergentTopBar": {
    "display": "flex",
    "alignItems": "center",
    "justifyContent": "space-between",
    "gap": "18px",
    "marginBottom": "16px"
  },
  "emergentEyebrow": {
    "color": "var(--fmed-muted)",
    "fontSize": "10px",
    "letterSpacing": "0.22em",
    "textTransform": "uppercase",
    "fontWeight": 400,
    "marginBottom": "5px"
  },
  "emergentPageTitle": {
    "margin": 0,
    "color": "var(--fmed-text)",
    "fontSize": "24px",
    "lineHeight": "29px",
    "fontWeight": 400,
    "letterSpacing": "-0.02em"
  },
  "emergentTopActions": {
    "display": "flex",
    "alignItems": "center",
    "justifyContent": "flex-end",
    "gap": "10px",
    "minWidth": "470px"
  },
  "emergentSearchInput": {
    "width": "310px",
    "height": "40px",
    "borderRadius": "10px",
    "border": "1px solid var(--fmed-border)",
    "background": "var(--fmed-surface-solid)",
    "color": "var(--fmed-text)",
    "padding": "0 14px",
    "fontSize": "14px",
    "outline": "none",
    "boxShadow": "none"
  },
  "emergentNewAssetBtn": {
    "height": "40px",
    "padding": "0 20px",
    "borderRadius": "10px",
    "border": "1px solid #133C55",
    "background": "#133C55",
    "color": "#FFFFFF",
    "cursor": "pointer",
    "fontSize": "13px",
    "fontWeight": 500,
    "letterSpacing": "0.10em",
    "textTransform": "uppercase",
    "minHeight": "40px"
  },
  "emergentHero": {
    "minHeight": "78px",
    "background": "linear-gradient(135deg,#133C55,#165A52)",
    "borderRadius": "12px",
    "border": "1px solid rgba(19,60,85,.18)",
    "borderBottom": "4px solid #6DB193",
    "boxShadow": "0 6px 16px rgba(15,23,42,.08)",
    "padding": "16px 20px",
    "marginBottom": "14px",
    "display": "flex",
    "alignItems": "center",
    "justifyContent": "space-between",
    "gap": "28px",
    "color": "#F4F8F7"
  },
  "emergentHeroLabel": {
    "fontSize": "10px",
    "textTransform": "uppercase",
    "letterSpacing": ".05em",
    "color": "rgba(247,249,251,.72)",
    "marginBottom": "6px",
    "fontWeight": 500,
    "lineHeight": "13px"
  },
  "emergentHeroNumber": {
    "fontSize": "34px",
    "lineHeight": "36px",
    "fontWeight": 500,
    "letterSpacing": "-0.04em",
    "color": "#F4F8F7"
  },
  "emergentHeroSub": {
    "marginTop": "7px",
    "color": "rgba(247,249,251,.82)",
    "fontSize": "12px",
    "lineHeight": "16px",
    "fontWeight": 400
  },
  "emergentHeroActions": {
    "display": "flex",
    "flexWrap": "wrap",
    "gap": "9px",
    "alignItems": "center",
    "justifyContent": "flex-end"
  },
  "emergentHeroBtn": {
    "height": "36px",
    "minHeight": "36px",
    "padding": "0 20px",
    "borderRadius": "10px",
    "border": "1px solid rgba(247,249,251,.38)",
    "background": "rgba(255,255,255,.04)",
    "color": "#FFFFFF",
    "cursor": "pointer",
    "fontSize": "12px",
    "fontWeight": 500,
    "letterSpacing": "0.12em",
    "textTransform": "uppercase",
    "boxShadow": "none"
  },
  "emergentHeroBtnActive": {
    "height": "36px",
    "minHeight": "36px",
    "padding": "0 20px",
    "borderRadius": "10px",
    "border": "1px solid #6DB193",
    "background": "#6DB193",
    "color": "#FFFFFF",
    "cursor": "pointer",
    "fontSize": "12px",
    "fontWeight": 500,
    "letterSpacing": "0.12em",
    "textTransform": "uppercase",
    "boxShadow": "none"
  },
  "emergentQuickGrid": {
    "display": "grid",
    "gridTemplateColumns": "repeat(auto-fit, minmax(260px, 1fr))",
    "gap": "12px",
    "marginBottom": "14px"
  },
  "emergentQuickCard": {
    "position": "relative",
    "minHeight": "116px",
    "textAlign": "left",
    "border": "1px solid rgba(20,32,51,.08)",
    "borderRadius": "12px",
    "background": "var(--fmed-surface-solid)",
    "color": "var(--fmed-text)",
    "padding": "16px",
    "display": "flex",
    "flexDirection": "column",
    "alignItems": "flex-start",
    "gap": "6px",
    "boxShadow": "0 3px 10px rgba(15,23,42,.04)",
    "cursor": "pointer"
  },
  "emergentQuickArrow": {
    "position": "absolute",
    "top": "18px",
    "right": "20px",
    "color": "var(--fmed-muted)",
    "fontSize": "25px",
    "lineHeight": 1
  },
  "emergentIconBox": {
    "width": "30px",
    "height": "30px",
    "borderRadius": "10px",
    "display": "inline-flex",
    "alignItems": "center",
    "justifyContent": "center",
    "background": "#F4F8F7",
    "color": "#6DB193",
    "fontSize": "15px",
    "marginBottom": "5px",
    "minWidth": "30px",
    "boxShadow": "none"
  },
  "emergentQuickLabel": {
    "color": "var(--fmed-muted)",
    "fontSize": "10px",
    "textTransform": "uppercase",
    "letterSpacing": ".05em",
    "fontWeight": 500,
    "lineHeight": "13px"
  },
  "emergentQuickValue": {
    "color": "var(--fmed-text)",
    "fontSize": "28px",
    "lineHeight": "31px",
    "fontWeight": 500,
    "letterSpacing": "-0.03em"
  },
  "emergentQuickSmall": {
    "color": "var(--fmed-muted)",
    "fontSize": "12px",
    "lineHeight": "16px",
    "textTransform": "none",
    "letterSpacing": "0",
    "fontWeight": 400
  },
  "emergentAlertGrid": {
    "display": "grid",
    "gridTemplateColumns": "repeat(4, minmax(0, 1fr))",
    "gap": "16px",
    "marginBottom": "16px"
  },
  "emergentAlertCard": {
    "minHeight": "76px",
    "borderRadius": "14px",
    "border": "1px solid var(--fmed-border)",
    "background": "var(--fmed-surface-solid)",
    "color": "var(--fmed-text)",
    "padding": "14px 18px",
    "display": "flex",
    "alignItems": "center",
    "gap": "14px",
    "textAlign": "left",
    "cursor": "pointer",
    "boxShadow": "0 1px 2px rgba(19,60,85,.04), 0 6px 18px rgba(19,60,85,.05)"
  },
  "emergentAlertRed": {
    "borderColor": "#F4B4AF"
  },
  "emergentAlertOrange": {
    "borderColor": "#F1CFA5"
  },
  "emergentAlertGold": {
    "borderColor": "#F4F8F7"
  },
  "emergentAlertNumber": {
    "width": "48px",
    "height": "48px",
    "minWidth": "48px",
    "borderRadius": "11px",
    "display": "inline-flex",
    "alignItems": "center",
    "justifyContent": "center",
    "background": "#F8E1DD",
    "color": "#A8362A",
    "fontSize": "20px",
    "fontWeight": 400
  },
  "themeLightVars": {
    "--fmed-bg": "#F5F1E8",
    "--fmed-surface": "rgba(252,250,245,.96)",
    "--fmed-surface-solid": "#FCFAF5",
    "--fmed-surface-soft": "#F7F2E8",
    "--fmed-text": "#1F2933",
    "--fmed-muted": "#667085",
    "--fmed-border": "rgba(31,78,109,.14)",
    "--fmed-accent": "#0F7C90",
    "--fmed-accent-2": "#0A5968",
    "--fmed-sand": "#12314A",
    "--fmed-sage": "#6DB193",
    "--fmed-sage-dark": "#165A52",
    "--fmed-primary": "#0F7C90",
    "--fmed-primary-2": "#0A5968",
    "--fmed-highlight": "#6DB193",
    "--fmed-btn": "linear-gradient(135deg, #0F7C90 0%, #0A5968 100%)",
    "--fmed-btn-shadow": "0 16px 34px rgba(31,78,109,.20)",
    "--fmed-main-bg": "linear-gradient(180deg, #F5F1E8 0%, #FBF8F1 52%, #EFE7DA 100%)",
    "--fmed-sidebar-bg": "linear-gradient(180deg, #173B50 0%, #1F4E6D 55%, #16394E 100%)",
    "--fmed-header-bg": "rgba(252,250,245,.94)",
    "--fmed-header-inner": "linear-gradient(145deg, rgba(252,250,245,.98), rgba(247,242,232,.94))",
    "--fmed-card-gradient": "linear-gradient(145deg, rgba(252,250,245,.98), rgba(247,242,232,.95))",
    "--fmed-soft-gradient": "linear-gradient(145deg, rgba(255,255,255,.84), rgba(247,242,232,.92))",
    "--fmed-alert-red-bg": "linear-gradient(135deg, rgba(83,30,25,.96), rgba(13,34,52,.94))",
    "--fmed-alert-orange-bg": "linear-gradient(135deg, rgba(83,55,20,.96), rgba(13,34,52,.94))",
    "--fmed-alert-gold-bg": "linear-gradient(135deg, rgba(18,49,74,.98), rgba(13,34,52,.94))",
    "--fmed-danger-bg": "#4A1F1B",
    "--fmed-danger-text": "#FF8A7A",
    "--fmed-danger-border": "rgba(255,138,122,.45)",
    "--fmed-soft-btn-bg": "#12314A",
    "--fmed-soft-btn-text": "#F4F8F7",
    "--fmed-panel-gradient": "linear-gradient(180deg, rgba(8,49,76,.98) 0%, rgba(5,36,56,.98) 100%)",
    "--fmed-hero-bg": "linear-gradient(135deg, rgba(8,49,76,.98) 0%, rgba(4,30,48,.98) 100%)",
    "--fmed-hero-border": "rgba(177,215,238,.24)",
    "--fmed-icon-bg": "rgba(242,184,75,.14)",
    "--fmed-icon-text": "#F2B84B",
    "--fmed-trust-border": "rgba(177,215,238,.22)",
    "--fmed-subtle": "#8793A0",
    "--fmed-card-shadow": "0 18px 45px rgba(31,78,109,.12)",
    "--fmed-card-shadow-soft": "0 10px 24px rgba(31,78,109,.08)",
    "--fmed-sidebar-text": "#F8FAFC",
    "--fmed-sidebar-muted": "rgba(248,250,252,.68)",
    "--fmed-border-strong": "rgba(23,33,43,.20)",
    "--fmed-blue": "#165A52",
    "--fmed-success": "#2F8F67",
    "--fmed-warning": "#D48A18",
    "--fmed-danger": "#C9434F",
    "--fmed-btn-blue": "linear-gradient(135deg,#169C8F 0%,#165A52 100%)",
    "--fmed-focus": "0 0 0 3px rgba(127,160,136,.22)",
    "--fmed-surface-raised": "#FFFFFF",
    "--fmed-btn-secondary": "linear-gradient(135deg,#7FA088 0%,#5F8068 100%)"
  },
  "smartHero": {
    "display": "grid",
    "gridTemplateColumns": "minmax(0,1fr) 310px",
    "gap": "18px",
    "alignItems": "stretch",
    "marginBottom": "18px"
  },
  "smartHeroMain": {
    "background": "linear-gradient(135deg,#1F4E6D,#295E80)",
    "border": "1px solid rgba(228,221,208,.36)",
    "borderRadius": "28px",
    "padding": "24px 26px",
    "boxShadow": "0 18px 42px rgba(31,78,109,.16)"
  },
  "smartHeroTitle": {
    "margin": "6px 0 8px 0",
    "fontSize": "34px",
    "lineHeight": 1.05,
    "fontWeight": 400,
    "color": "var(--fmed-text)",
    "letterSpacing": "-.04em"
  },
  "smartHeroText": {
    "margin": 0,
    "maxWidth": "760px",
    "color": "var(--fmed-muted)",
    "fontSize": "15px",
    "lineHeight": 1.55
  },
  "smartHeroActions": {
    "display": "flex",
    "flexWrap": "wrap",
    "gap": "10px",
    "marginTop": "18px"
  },
  "smartHeroStatus": {
    "background": "linear-gradient(180deg,#FCFAF5,#F8F4EC)",
    "border": "1px solid #E4DDD0",
    "borderRadius": "28px",
    "padding": "24px",
    "display": "flex",
    "flexDirection": "column",
    "justifyContent": "center",
    "boxShadow": "0 14px 32px rgba(31,78,109,.08)"
  },
  "smartHeroStatusLabel": {
    "color": "var(--fmed-muted)",
    "fontSize": "13px",
    "letterSpacing": ".12em",
    "textTransform": "uppercase"
  },
  "smartHeroStatusValue": {
    "color": "var(--fmed-text)",
    "fontSize": "58px",
    "lineHeight": 1,
    "fontWeight": 400,
    "marginTop": "8px"
  },
  "smartHeroStatusSub": {
    "color": "var(--fmed-muted)",
    "fontSize": "14px",
    "marginTop": "12px"
  },
  "smartKpiGrid": {
    "display": "grid",
    "gridTemplateColumns": "repeat(4, minmax(0,1fr))",
    "gap": "14px",
    "marginBottom": "16px"
  },
  "smartQuickGrid": {
    "display": "grid",
    "gridTemplateColumns": "repeat(4, minmax(0,1fr))",
    "gap": "14px",
    "marginBottom": "16px"
  },
  "smartQuickCard": {
    "appearance": "none",
    "textAlign": "left",
    "border": "1px solid rgba(31,174,156,.20)",
    "borderRadius": "18px",
    "padding": "18px 18px",
    "background": "linear-gradient(145deg, rgba(14,43,64,.94), rgba(8,25,38,.94))",
    "color": "#F4FBFF",
    "cursor": "pointer",
    "minHeight": "118px",
    "display": "flex",
    "flexDirection": "column",
    "gap": "8px",
    "boxShadow": "0 14px 30px rgba(31,78,109,.08)"
  },
  "smartQuickIcon": {
    "fontSize": "24px"
  },
  "smartSectionCard": {
    "background": "linear-gradient(145deg, rgba(10,35,52,.96), rgba(6,20,32,.96))",
    "border": "1px solid rgba(31,174,156,.20)",
    "borderRadius": "18px",
    "marginBottom": "8px",
    "overflow": "hidden",
    "boxShadow": "0 20px 50px rgba(0,0,0,.24)",
    "color": "#F4FBFF"
  },
  "smartSectionHeader": {
    "width": "100%",
    "border": 0,
    "background": "transparent",
    "color": "#F4FBFF",
    "display": "flex",
    "justifyContent": "space-between",
    "alignItems": "center",
    "gap": "14px",
    "padding": "10px 14px",
    "cursor": "pointer",
    "textAlign": "left",
    "fontFamily": "inherit",
    "minHeight": "50px",
    "borderRadius": "12px"
  },
  "smartSectionTitleBox": {
    "display": "flex",
    "flexDirection": "column",
    "gap": "4px"
  },
  "smartSectionTitle": {
    "fontSize": "14px",
    "color": "#F4FBFF",
    "fontWeight": 700,
    "lineHeight": "18px",
    "letterSpacing": ".05em"
  },
  "smartSectionSubtitle": {
    "fontSize": "11px",
    "color": "#C8D4DF",
    "lineHeight": "15px",
    "fontWeight": 400,
    "letterSpacing": ".05em"
  },
  "smartSectionAction": {
    "border": "1px solid var(--fmed-border)",
    "borderRadius": "12px",
    "padding": "0 12px",
    "color": "var(--fmed-muted)",
    "background": "var(--fmed-soft-btn-bg)",
    "fontSize": "11px",
    "whiteSpace": "nowrap",
    "minHeight": "32px",
    "fontWeight": 500,
    "letterSpacing": ".05em"
  },
  "smartSectionBody": {
    "padding": "0 20px 20px 20px"
  },
  "smartDashboardColumns": {
    "display": "grid",
    "gridTemplateColumns": "repeat(2, minmax(0,1fr))",
    "gap": "16px"
  },
  "smartActionGrid": {
    "display": "flex",
    "flexWrap": "wrap",
    "gap": "10px"
  },
  "smartFilterToggleRow": {
    "display": "flex",
    "alignItems": "center",
    "flexWrap": "wrap",
    "gap": "14px",
    "margin": "14px 0 4px 0",
    "justifyContent": "space-between",
    "width": "100%",
    "maxWidth": "100%",
    "overflow": "hidden",
    "boxSizing": "border-box"
  },
  "smartFilterHint": {
    "color": "var(--fmed-muted)",
    "fontSize": "13px",
    "minWidth": 0,
    "maxWidth": "100%",
    "overflowWrap": "anywhere",
    "whiteSpace": "normal",
    "textAlign": "right"
  },
  "app": {
    "display": "flex",
    "width": "100vw",
    "height": "100vh",
    "color": "var(--fmed-text)",
    "fontFamily": "'Futura', 'Futura PT', 'Jost', 'Century Gothic', Arial, sans-serif",
    "overflow": "hidden",
    "background": "var(--fmed-main-bg)",
    "letterSpacing": ".01em"
  },
  "sidebar": {
    "width": "250px",
    "minWidth": "250px",
    "height": "100vh",
    "backgroundColor": "transparent",
    "backgroundImage": "var(--fmed-sidebar-bg)",
    "backgroundSize": "cover",
    "backgroundPosition": "left bottom",
    "backgroundRepeat": "no-repeat",
    "borderRight": "1px solid var(--fmed-border)",
    "boxShadow": "12px 0 36px rgba(0,0,0,.16)",
    "padding": "22px 16px 18px",
    "boxSizing": "border-box",
    "position": "relative",
    "overflow": "hidden",
    "display": "flex",
    "flexDirection": "column",
    "background": "var(--fmed-sidebar-bg)",
    "color": "var(--fmed-sidebar-text)",
    "overflowX": "hidden",
    "textTransform": "uppercase"
  },
  "sidebarNav": {
    "display": "flex",
    "flexDirection": "column",
    "gap": 8,
    "marginTop": "28px",
    "width": "100%",
    "flex": "1 1 auto",
    "minHeight": 0,
    "overflowY": "auto",
    "paddingBottom": "8px",
    "scrollbarWidth": "thin",
    "paddingRight": "2px",
    "overflowX": "hidden"
  },
  "menuIconWrap": {
    "width": "30px",
    "minWidth": "30px",
    "height": "30px",
    "display": "flex",
    "alignItems": "center",
    "justifyContent": "center",
    "borderRadius": "10px",
    "background": "rgba(22,185,201,.10)",
    "fontSize": "21px",
    "color": "var(--fmed-accent-2)",
    "border": "1px solid rgba(31,174,156,.12)"
  },
  "menuLabel": {
    "flex": 1,
    "textAlign": "left",
    "whiteSpace": "normal",
    "overflow": "hidden",
    "textOverflow": "ellipsis",
    "fontWeight": 650,
    "overflowWrap": "anywhere",
    "fontSize": "16px",
    "letterSpacing": "0.01em"
  },
  "menuInfoIcon": {
    "width": "18px",
    "minWidth": "18px",
    "height": "18px",
    "borderRadius": "999px",
    "display": "inline-flex",
    "alignItems": "center",
    "justifyContent": "center",
    "border": "1px solid rgba(255,255,255,.38)",
    "background": "rgba(255,255,255,.08)",
    "color": "rgba(255,255,255,.90)",
    "fontSize": "11px",
    "fontWeight": 700,
    "lineHeight": 1,
    "textTransform": "lowercase",
    "cursor": "help"
  },
  "sidebarBrandLink": {
    "display": "block",
    "textDecoration": "none",
    "color": "inherit",
    "cursor": "pointer"
  },
  "sidebarBrand": {
    "minHeight": "146px",
    "height": "146px",
    "display": "flex",
    "flexDirection": "column",
    "alignItems": "center",
    "justifyContent": "center",
    "padding": "6px",
    "borderRadius": "12px",
    "background": "rgba(255,255,255,.98)",
    "border": "1px solid rgba(255,255,255,.55)",
    "boxShadow": "0 10px 24px rgba(0,0,0,.16)",
    "marginBottom": "10px",
    "textAlign": "center",
    "backdropFilter": "blur(8px)",
    "overflow": "hidden",
    "color": "var(--fmed-sidebar-text)",
    "borderBottom": "1px solid rgba(255,255,255,.10)"
  },
  "sidebarOnlyTitle": {
    "margin": "0 0 2px 0",
    "textAlign": "left",
    "color": "#FFFFFF",
    "fontSize": "27px",
    "lineHeight": "31px",
    "fontWeight": 950,
    "letterSpacing": ".05em",
    "textShadow": "0 3px 14px rgba(0,0,0,.22)",
    "WebkitTextFillColor": "#FFFFFF"
  },
  "sidebarOnlySub": {
    "margin": "0 0 12px 0",
    "textAlign": "left",
    "color": "var(--fmed-sidebar-muted)",
    "fontSize": "12px",
    "lineHeight": "18px",
    "fontWeight": 850,
    "letterSpacing": ".18em",
    "textTransform": "uppercase",
    "display": "block",
    "marginTop": "6px",
    "marginBottom": "18px",
    "WebkitTextFillColor": "var(--fmed-sidebar-muted)"
  },
  "fmedBrandMark": {
    "width": "54px",
    "height": "54px",
    "borderRadius": "18px",
    "display": "flex",
    "alignItems": "center",
    "justifyContent": "center",
    "position": "relative",
    "background": "linear-gradient(135deg,#8F9E8B 0%,#7C8B79 100%)",
    "boxShadow": "0 14px 32px rgba(143,158,139,.24)",
    "border": "1px solid rgba(255,255,255,.35)"
  },
  "fmedBrandCross": {
    "color": "#ffffff",
    "fontSize": "28px",
    "lineHeight": "28px",
    "fontWeight": 400,
    "textShadow": "0 4px 12px rgba(0,0,0,.25)"
  },
  "fmedBrandCircuit": {
    "position": "absolute",
    "right": "7px",
    "bottom": "5px",
    "color": "rgba(255,255,255,.78)",
    "fontSize": "16px",
    "transform": "rotate(-18deg)"
  },
  "sidebarLogoNew": {
    "display": "block",
    "width": "100%",
    "height": "100%",
    "objectFit": "contain",
    "borderRadius": "10px",
    "background": "#FFFFFF",
    "border": "none",
    "boxShadow": "none",
    "filter": "contrast(1.08) saturate(1.08)",
    "padding": "0",
    "boxSizing": "border-box",
    "maxWidth": "none",
    "maxHeight": "none"
  },
  "fmedBrandTextBox": {
    "color": "#ffffff"
  },
  "fmedBrandTitle": {
    "fontSize": "20px",
    "lineHeight": "22px",
    "fontWeight": 400,
    "letterSpacing": "3.2px",
    "color": "#ffffff"
  },
  "fmedBrandDb": {
    "marginTop": "3px",
    "fontSize": "16px",
    "lineHeight": "20px",
    "fontWeight": 400,
    "letterSpacing": "1.4px",
    "color": "#8F9E8B"
  },
  "fmedBrandClaim": {
    "marginTop": "7px",
    "maxWidth": "170px",
    "fontSize": "9.5px",
    "lineHeight": "12px",
    "fontWeight": 400,
    "letterSpacing": "1px",
    "color": "rgba(255,255,255,.82)",
    "textTransform": "uppercase"
  },
  "sidebarLogoImage": {
    "display": "block",
    "width": "66px",
    "height": "66px",
    "objectFit": "contain",
    "borderRadius": "18px",
    "background": "transparent",
    "border": "none",
    "boxShadow": "none",
    "filter": "drop-shadow(0 0 18px rgba(143,158,139,.24))"
  },
  "sidebarLogoTitle": {
    "display": "none"
  },
  "sidebarLogoSubtitle": {
    "display": "none"
  },
  "sidebarLogoWrap": {
    "display": "flex",
    "alignItems": "center",
    "gap": "13px",
    "marginBottom": "20px"
  },
  "fmedLogoMark": {
    "width": "54px",
    "height": "54px",
    "borderRadius": "18px",
    "display": "flex",
    "alignItems": "center",
    "justifyContent": "center",
    "background": "linear-gradient(135deg,#8F9E8B 0%,#7C8B79 100%)",
    "boxShadow": "0 12px 26px rgba(143,158,139,.24)",
    "border": "1px solid rgba(255,255,255,.24)"
  },
  "fmedLogoCross": {
    "color": "#ffffff",
    "fontSize": "28px",
    "lineHeight": "28px",
    "fontWeight": 400,
    "textShadow": "0 3px 10px rgba(0,0,0,.25)"
  },
  "fmedLogoText": {
    "fontSize": "24px",
    "lineHeight": "26px",
    "fontWeight": 400,
    "letterSpacing": "4px",
    "color": "#8F9E8B"
  },
  "fmedLogoSub": {
    "marginTop": "5px",
    "color": "rgba(255,255,255,.74)",
    "fontSize": "10px",
    "lineHeight": "14px",
    "fontWeight": 400,
    "letterSpacing": "1.1px",
    "textTransform": "uppercase"
  },
  "sidebarBrandTop": {
    "fontSize": "19px",
    "fontWeight": 400,
    "letterSpacing": "4px",
    "color": "#8F9E8B",
    "marginBottom": "8px"
  },
  "sidebarBrandPage": {
    "fontSize": "30px",
    "lineHeight": "34px",
    "fontWeight": 400,
    "color": "var(--fmed-sidebar-muted)",
    "letterSpacing": ".08em",
    "textTransform": "uppercase"
  },
  "sidebarBrandSub": {
    "marginTop": "10px",
    "color": "rgba(255,255,255,.72)",
    "fontSize": "12px",
    "lineHeight": "18px",
    "letterSpacing": "1.1px"
  },
  "smartInterventoBox": {
    "marginBottom": "12px",
    "padding": "20px",
    "borderRadius": "18px",
    "background": "var(--fmed-surface-soft)",
    "border": "1px solid var(--fmed-border)"
  },
  "smartInterventoHeader": {
    "display": "flex",
    "justifyContent": "space-between",
    "gap": "16px",
    "alignItems": "flex-start",
    "marginBottom": "14px",
    "flexWrap": "wrap"
  },
  "smartInterventoTitle": {
    "margin": "0 0 6px 0",
    "fontSize": "20px",
    "color": "var(--fmed-text)"
  },
  "smartResultsBox": {
    "marginTop": "14px",
    "display": "grid",
    "gap": "8px"
  },
  "smartResultRow": {
    "display": "grid",
    "gridTemplateColumns": "120px 1.2fr .8fr .9fr 1fr 1fr",
    "gap": "12px",
    "alignItems": "center",
    "padding": "10px 12px",
    "borderRadius": "12px",
    "background": "var(--fmed-surface-solid)",
    "border": "1px solid var(--fmed-border)",
    "cursor": "pointer",
    "fontSize": "13px",
    "color": "var(--fmed-text)"
  },
  "smartResultCode": {
    "color": "var(--fmed-accent-2)",
    "textDecoration": "underline"
  },
  "appName": {
    "display": "none"
  },
  "appSub": {
    "display": "none"
  },
  "menuBtn": {
    "width": "100%",
    "minHeight": 48,
    "padding": "0 13px",
    "marginBottom": "0",
    "borderRadius": 10,
    "background": "rgba(12,31,46,.58)",
    "border": "1px solid rgba(88,126,151,.20)",
    "cursor": "pointer",
    "color": "var(--fmed-text)",
    "fontSize": 14,
    "fontWeight": 850,
    "transition": "background .18s ease, color .18s ease, transform .18s ease",
    "display": "flex",
    "alignItems": "center",
    "justifyContent": "flex-start",
    "gap": "9px",
    "appearance": "none",
    "WebkitAppearance": "none",
    "fontFamily": "\"Futura Light\", \"Futura PT\", Futura, \"Trebuchet MS\", Arial, sans-serif",
    "letterSpacing": ".04em",
    "height": "42px",
    "boxShadow": "none",
    "lineHeight": "16px",
    "whiteSpace": "normal",
    "textTransform": "uppercase"
  },
  "menuBtnActive": {
    "background": "linear-gradient(90deg, rgba(20,125,134,.96), rgba(13,99,108,.82))",
    "border": "1px solid rgba(20,125,134,.58)",
    "boxShadow": "0 14px 30px rgba(0,0,0,.28), inset 4px 0 0 rgba(255,255,255,.20)",
    "color": "#FFFFFF"
  },
  "main": {
    "flex": "1 1 auto",
    "height": "100vh",
    "padding": "22px 26px 34px",
    "boxSizing": "border-box",
    "overflow": "auto",
    "backgroundColor": "#F5F1E8",
    "backgroundImage": "var(--fmed-main-bg)",
    "backgroundSize": "cover",
    "backgroundPosition": "center bottom",
    "backgroundRepeat": "no-repeat",
    "background": "transparent",
    "gap": "16px",
    "color": "var(--fmed-text)",
    "overflowX": "hidden",
    "minWidth": 0,
    "width": "auto",
    "maxWidth": "none",
    "transition": "padding .22s ease, width .22s ease"
  },
  "headerBanner": {
    "width": "100%",
    "minHeight": "54px",
    "marginBottom": 6,
    "borderRadius": 24,
    "border": "1px solid var(--fmed-border)",
    "background": "var(--fmed-header-inner)",
    "boxShadow": "var(--fmed-card-shadow-soft)",
    "overflow": "hidden",
    "position": "relative",
    "color": "var(--fmed-text)",
    "padding": "0 0 16px",
    "display": "none"
  },
  "headerBannerContent": {
    "minHeight": "54px",
    "padding": "0 0 0 0",
    "boxSizing": "border-box",
    "display": "flex",
    "alignItems": "center",
    "justifyContent": "space-between",
    "gap": 14,
    "backgroundImage": "var(--fmed-header-inner)",
    "backgroundSize": "cover",
    "backgroundPosition": "center",
    "background": "transparent",
    "border": "0",
    "boxShadow": "none"
  },
  "headerBrandText": {
    "display": "none",
    "flexDirection": "column",
    "alignItems": "flex-end",
    "justifyContent": "center",
    "minWidth": "160px"
  },
  "headerBrandMain": {
    "fontSize": "22px",
    "lineHeight": "26px",
    "fontWeight": 500,
    "letterSpacing": ".04em",
    "color": "#F7F9FB",
    "textAlign": "right",
    "whiteSpace": "nowrap",
    "textShadow": "0 1px 2px rgba(0,0,0,.20)"
  },
  "headerBrandSub": {
    "marginTop": "2px",
    "color": "#D7E4E5",
    "fontSize": "10px",
    "lineHeight": "13px",
    "fontWeight": 400,
    "letterSpacing": ".05em",
    "textAlign": "right"
  },
  "pageContext": {
    "margin": "0 0 6px 0",
    "color": "#0B2340",
    "fontSize": "20px",
    "lineHeight": "12px",
    "fontWeight": 700,
    "letterSpacing": 0,
    "marginBottom": "4px",
    "textTransform": "none"
  },
  "pageTitle": {
    "margin": 0,
    "color": "var(--fmed-text)",
    "fontSize": "24px",
    "lineHeight": "29px",
    "fontWeight": 950,
    "letterSpacing": ".02em",
    "display": "none",
    "WebkitTextFillColor": "var(--fmed-text)"
  },
  "pageSub": {
    "margin": "7px 0 0 0",
    "color": "var(--fmed-muted)",
    "fontSize": "12px",
    "fontWeight": 650,
    "marginTop": "4px",
    "lineHeight": "16px",
    "WebkitTextFillColor": "var(--fmed-muted)"
  },
  "dashboardHero": {
    "display": "grid",
    "gridTemplateColumns": "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
    "gap": "12px",
    "alignItems": "stretch",
    "marginBottom": "12px",
    "padding": "clamp(14px, 4vw, 20px)",
    "borderRadius": "22px",
    "border": "1px solid #E4DDD0",
    "background": "linear-gradient(180deg, #FCFAF5 0%, #F7F2E8 100%)",
    "boxShadow": "0 18px 42px rgba(31,78,109,.10)",
    "overflow": "hidden"
  },
  "dashboardHeroLeft": {
    "display": "flex",
    "flexDirection": "column",
    "justifyContent": "center",
    "minWidth": 0
  },
  "dashboardEyebrow": {
    "color": "#647F69",
    "fontSize": "10px",
    "fontWeight": 400,
    "letterSpacing": "1.8px",
    "textTransform": "uppercase",
    "marginBottom": "5px"
  },
  "dashboardHeroTitle": {
    "margin": 0,
    "color": "var(--fmed-text)",
    "fontSize": "24px",
    "lineHeight": "28px",
    "fontWeight": 400,
    "letterSpacing": "-.35px"
  },
  "dashboardHeroText": {
    "maxWidth": "720px",
    "margin": "6px 0 0 0",
    "color": "var(--fmed-muted)",
    "fontSize": "12.5px",
    "lineHeight": "18px",
    "fontWeight": 400
  },
  "dashboardHeroActions": {
    "display": "flex",
    "gap": "8px",
    "flexWrap": "wrap",
    "marginTop": "10px"
  },
  "dashboardActionBtn": {
    "height": "34px",
    "padding": "0 16px",
    "borderRadius": "999px",
    "border": "1px solid rgba(111,128,104,.30)",
    "background": "var(--fmed-btn)",
    "color": "#FFFFFF",
    "fontSize": "13px",
    "fontWeight": 400,
    "cursor": "pointer",
    "boxShadow": "var(--fmed-btn-shadow)",
    "whiteSpace": "nowrap"
  },
  "dashboardActionBtnSoft": {
    "height": "34px",
    "padding": "0 14px",
    "borderRadius": "999px",
    "border": "1px solid var(--fmed-border)",
    "background": "var(--fmed-surface-solid)",
    "color": "var(--fmed-text)",
    "fontSize": "13px",
    "fontWeight": 400,
    "cursor": "pointer",
    "boxShadow": "0 8px 18px rgba(61,58,53,.06)",
    "whiteSpace": "nowrap"
  },
  "dashboardHeroRight": {
    "minHeight": "96px",
    "borderRadius": "18px",
    "background": "linear-gradient(135deg, #8DAA91, #647F69)",
    "color": "#FFFFFF",
    "display": "flex",
    "flexDirection": "column",
    "alignItems": "center",
    "justifyContent": "center",
    "textAlign": "center",
    "boxShadow": "0 14px 30px rgba(100,127,105,.22)"
  },
  "dashboardHeroNumber": {
    "fontSize": "34px",
    "lineHeight": "36px",
    "fontWeight": 400,
    "letterSpacing": "-.45px"
  },
  "dashboardHeroLabel": {
    "marginTop": "3px",
    "fontSize": "12.5px",
    "fontWeight": 400
  },
  "dashboardHeroSubLabel": {
    "marginTop": "2px",
    "fontSize": "11px",
    "fontWeight": 400,
    "opacity": 0.86
  },
  "kpiGrid": {
    "display": "grid",
    "gridTemplateColumns": "repeat(2, minmax(0, 1fr))",
    "gap": "16px",
    "marginBottom": "12px"
  },
  "kpi": {
    "background": "linear-gradient(180deg, #FCFAF5 0%, #F8F4EC 100%)",
    "border": "1px solid #E4DDD0",
    "borderRadius": "12px",
    "padding": "20px",
    "boxShadow": "0 14px 30px rgba(31,78,109,.08)",
    "minHeight": "104px",
    "boxSizing": "border-box"
  },
  "kpiTitle": {
    "color": "#6B7280",
    "fontSize": "11px",
    "fontWeight": 500,
    "letterSpacing": ".05em",
    "textTransform": "uppercase"
  },
  "kpiValue": {
    "marginTop": "8px",
    "color": "#1F2933",
    "fontSize": "30px",
    "lineHeight": "34px",
    "fontWeight": 500
  },
  "scadenzeDashboardGrid": {
    "display": "grid",
    "gridTemplateColumns": "repeat(auto-fit, minmax(min(100%, 230px), 1fr))",
    "gap": "10px",
    "marginBottom": "12px"
  },
  "alertMiniCard": {
    "display": "flex",
    "alignItems": "center",
    "gap": "12px",
    "padding": "13px 16px",
    "borderRadius": "18px",
    "border": "1px solid var(--fmed-border)",
    "cursor": "pointer",
    "boxShadow": "0 12px 28px rgba(61,58,53,.07)",
    "minHeight": "64px",
    "boxSizing": "border-box"
  },
  "dashboardAlertRed": {
    "background": "var(--fmed-alert-red-bg)",
    "borderColor": "rgba(230,75,98,.38)"
  },
  "dashboardAlertOrange": {
    "background": "var(--fmed-alert-orange-bg)",
    "borderColor": "rgba(242,138,85,.42)"
  },
  "dashboardAlertGold": {
    "background": "var(--fmed-alert-gold-bg)",
    "borderColor": "rgba(217,178,76,.42)"
  },
  "alertIconDot": {
    "width": "30px",
    "height": "30px",
    "borderRadius": "999px",
    "boxShadow": "0 10px 22px rgba(0,0,0,.14)",
    "flex": "0 0 30px"
  },
  "alertTitle": {
    "color": "var(--fmed-text)",
    "fontSize": "16px",
    "lineHeight": "20px",
    "fontWeight": 400
  },
  "scadenzeHeader": {
    "display": "flex",
    "alignItems": "center",
    "justifyContent": "space-between",
    "gap": "14px",
    "marginBottom": "12px",
    "background": "var(--fmed-card-gradient)",
    "border": "1px solid var(--fmed-border)",
    "borderRadius": 28,
    "color": "var(--fmed-text)",
    "padding": 20,
    "boxShadow": "var(--fmed-card-shadow)"
  },
  "selectSmall": {
    "height": "40px",
    "padding": "0 12px",
    "borderRadius": "12px",
    "border": "1px solid var(--fmed-border)",
    "background": "var(--fmed-surface-solid)",
    "color": "var(--fmed-text)",
    "fontSize": "13px",
    "outline": "none",
    "boxShadow": "0 8px 20px rgba(111,128,104,.08)"
  },
  "alertCard": {
    "display": "flex",
    "alignItems": "center",
    "gap": "16px",
    "padding": "18px 22px",
    "marginBottom": "20px",
    "borderRadius": "18px",
    "background": "var(--fmed-alert-gold-bg)",
    "border": "1px solid #FEC84B",
    "color": "var(--fmed-text)",
    "cursor": "pointer",
    "boxShadow": "0 16px 38px rgba(61,58,53,.10)"
  },
  "alertIcon": {
    "fontSize": "28px"
  },
  "alertText": {
    "margin": "6px 0 0 0",
    "color": "var(--fmed-muted)",
    "fontSize": "13px",
    "lineHeight": "18px",
    "fontWeight": 400
  },
  "dashboardGrid": {
    "display": "grid",
    "gridTemplateColumns": "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
    "gap": "14px",
    "alignItems": "stretch"
  },
  "dashboardChartCard": {
    "width": "100%",
    "boxSizing": "border-box",
    "background": "var(--fmed-surface-solid)",
    "border": "1px solid var(--fmed-border)",
    "borderRadius": "22px",
    "padding": "clamp(16px, 4vw, 24px)",
    "boxShadow": "0 18px 40px rgba(61,58,53,.10)",
    "overflow": "hidden",
    "minHeight": "318px"
  },
  "dashboardCardHeader": {
    "display": "flex",
    "alignItems": "flex-start",
    "justifyContent": "space-between",
    "gap": "16px",
    "marginBottom": "14px"
  },
  "dashboardCardKicker": {
    "marginBottom": "5px",
    "color": "var(--fmed-sage-dark)",
    "fontSize": "11px",
    "fontWeight": 400,
    "letterSpacing": "1.4px",
    "textTransform": "uppercase"
  },
  "dashboardTinyBtn": {
    "height": "38px",
    "padding": "0 16px",
    "borderRadius": "999px",
    "border": "1px solid var(--fmed-border)",
    "background": "var(--fmed-surface-soft)",
    "color": "var(--fmed-text)",
    "fontSize": "13px",
    "fontWeight": 400,
    "cursor": "pointer",
    "whiteSpace": "nowrap"
  },
  "card": {
    "width": "100%",
    "boxSizing": "border-box",
    "background": "var(--fmed-card-gradient)",
    "border": "1px solid var(--fmed-border)",
    "borderRadius": 24,
    "padding": "20px",
    "boxShadow": "var(--fmed-card-shadow-soft)",
    "overflow": "hidden",
    "color": "var(--fmed-text)",
    "maxWidth": "100%",
    "WebkitTextFillColor": "var(--fmed-text)"
  },
  "cardTitle": {
    "margin": 0,
    "color": "var(--fmed-text)",
    "fontSize": "20px",
    "lineHeight": "25px",
    "fontWeight": 850,
    "letterSpacing": "-.2px"
  },
  "muted": {
    "color": "var(--fmed-muted)",
    "fontSize": "14px"
  },
  "filters": {
    "display": "grid",
    "gridTemplateColumns": "repeat(auto-fit, minmax(min(100%, 190px), 1fr))",
    "gap": "16px",
    "marginBottom": "12px",
    "padding": "20px",
    "borderRadius": "12px",
    "border": "1px solid rgba(0,0,0,.08)",
    "boxShadow": "0 4px 14px rgba(0,0,0,.05)"
  },
  "interventiFilters": {
    "display": "grid",
    "gridTemplateColumns": "repeat(auto-fit, minmax(190px, 1fr))",
    "gap": 12,
    "marginTop": "16px",
    "marginBottom": "10px",
    "alignItems": "end",
    "padding": 18,
    "borderRadius": 24,
    "border": "1px solid var(--fmed-border)",
    "boxShadow": "var(--fmed-card-shadow-soft)",
    "background": "var(--fmed-card-gradient)",
    "color": "var(--fmed-text)",
    "margin": "16px 0 14px",
    "overflow": "hidden"
  },
  "contoEconomicoBox": {
    "margin": "18px 0 16px",
    "padding": 20,
    "borderRadius": 28,
    "border": "1px solid var(--fmed-border)",
    "background": "var(--fmed-card-gradient)",
    "boxShadow": "var(--fmed-card-shadow)",
    "color": "var(--fmed-text)",
    "overflow": "hidden"
  },
  "contoEconomicoHeader": {
    "display": "flex",
    "justifyContent": "space-between",
    "alignItems": "flex-start",
    "gap": 14,
    "marginBottom": 16,
    "flexWrap": "wrap"
  },
  "contoEconomicoTitle": {
    "margin": 0,
    "color": "var(--fmed-text)",
    "fontSize": "clamp(18px, 1.8vw, 24px)",
    "fontWeight": 950,
    "lineHeight": 1.08,
    "letterSpacing": "-.035em"
  },
  "periodoBadge": {
    "padding": "0 14px",
    "borderRadius": 999,
    "border": "1px solid color-mix(in srgb, var(--fmed-primary) 24%, var(--fmed-border))",
    "background": "color-mix(in srgb, var(--fmed-primary) 9%, var(--fmed-surface-solid))",
    "color": "var(--fmed-primary)",
    "fontSize": 12,
    "fontWeight": 900,
    "whiteSpace": "nowrap",
    "minHeight": 38,
    "display": "inline-flex",
    "alignItems": "center",
    "justifyContent": "center",
    "letterSpacing": ".045em",
    "textTransform": "uppercase"
  },
  "contoEconomicoGrid": {
    "display": "grid",
    "gridTemplateColumns": "repeat(auto-fit, minmax(165px, 1fr))",
    "gap": 12
  },
  "contoEconomicoCard": {
    "background": "var(--fmed-surface-solid)",
    "border": "1px solid var(--fmed-border)",
    "borderRadius": 20,
    "padding": "15px 16px",
    "boxShadow": "0 12px 30px rgba(8,32,51,.08)",
    "color": "var(--fmed-text)",
    "minHeight": 104,
    "display": "flex",
    "flexDirection": "column",
    "justifyContent": "space-between",
    "gap": 10
  },
  "contoEconomicoLabel": {
    "display": "block",
    "color": "var(--fmed-muted)",
    "fontSize": 11,
    "fontWeight": 900,
    "textTransform": "uppercase",
    "letterSpacing": ".08em",
    "marginBottom": "7px"
  },
  "contoEconomicoValue": {
    "display": "block",
    "color": "var(--fmed-text)",
    "fontSize": "clamp(20px, 2.1vw, 30px)",
    "fontWeight": 950,
    "lineHeight": 1,
    "letterSpacing": "-.04em",
    "overflowWrap": "anywhere"
  },
  "scadenzeActions": {
    "display": "flex",
    "justifyContent": "flex-start",
    "alignItems": "center",
    "gap": 10,
    "flexWrap": "wrap",
    "margin": "14px 0 18px",
    "paddingTop": "10px"
  },
  "dangerBtn": {
    "padding": "0 16px",
    "minWidth": "190px",
    "borderRadius": 14,
    "border": "1px solid rgba(220,53,69,.36)",
    "background": "linear-gradient(135deg, #DC3545 0%, #A92331 100%)",
    "color": "#FFFFFF",
    "fontWeight": 900,
    "cursor": "pointer",
    "boxShadow": "0 12px 24px rgba(220,53,69,.18)",
    "minHeight": 42,
    "whiteSpace": "nowrap"
  },
  "exportPdfBtn": {
    "padding": "15px 24px",
    "minWidth": "190px",
    "borderRadius": "14px",
    "border": "none",
    "background": "var(--fmed-btn)",
    "color": "#FFFFFF",
    "fontWeight": 400,
    "cursor": "pointer",
    "boxShadow": "var(--fmed-btn-shadow)"
  },
  "dateFilterGroup": {
    "display": "flex",
    "flexDirection": "column",
    "gap": "7px",
    "color": "var(--fmed-text)"
  },
  "dateFilterLabel": {
    "fontSize": "12px",
    "fontWeight": 800,
    "color": "#7FE2CC",
    "textTransform": "uppercase",
    "letterSpacing": ".08em"
  },
  "input": {
    "height": "42px",
    "padding": "10px 12px",
    "borderRadius": 13,
    "border": "1px solid var(--fmed-border)",
    "background": "var(--fmed-surface-solid)",
    "color": "var(--fmed-text)",
    "fontSize": "13px",
    "outline": "none",
    "boxShadow": "inset 0 1px 0 rgba(255,255,255,.035)",
    "textTransform": "none",
    "fontStyle": "normal",
    "minWidth": 0,
    "boxSizing": "border-box",
    "minHeight": 42,
    "fontWeight": 720,
    "width": "100%"
  },
  "select": {
    "height": "42px",
    "padding": "10px 12px",
    "borderRadius": 13,
    "border": "1px solid var(--fmed-border)",
    "background": "var(--fmed-surface-solid)",
    "color": "var(--fmed-text)",
    "fontSize": "13px",
    "outline": "none",
    "boxShadow": "none",
    "textTransform": "none",
    "fontStyle": "normal",
    "minWidth": 0,
    "boxSizing": "border-box",
    "minHeight": 42,
    "fontWeight": 780,
    "width": "100%"
  },
  "tableWrap": {
    "width": "100%",
    "overflowX": "auto",
    "marginTop": "14px",
    "borderRadius": 14,
    "border": "1px solid var(--fmed-border)",
    "boxShadow": "var(--fmed-card-shadow-soft)",
    "overflow": "auto",
    "background": "var(--fmed-surface)",
    "color": "var(--fmed-text)",
    "maxHeight": "64vh"
  },
  "loadMoreRow": {
    "display": "flex",
    "justifyContent": "center",
    "padding": "18px",
    "color": "var(--fmed-muted)"
  },
  "table": {
    "width": "100%",
    "borderCollapse": "separate",
    "fontSize": 12,
    "color": "var(--fmed-text)",
    "borderSpacing": 0,
    "background": "transparent",
    "WebkitTextFillColor": "var(--fmed-text)",
    "textTransform": "uppercase"
  },
  "th": {
    "padding": "14px 14px",
    "background": "var(--fmed-surface-3)",
    "color": "var(--fmed-muted)",
    "textAlign": "left",
    "fontSize": 12,
    "fontWeight": 950,
    "textTransform": "uppercase",
    "borderBottom": "1px solid var(--fmed-border)",
    "height": "40px",
    "lineHeight": 1.15,
    "letterSpacing": ".04em",
    "whiteSpace": "nowrap",
    "borderColor": "rgba(31,174,156,.16)",
    "position": "sticky",
    "top": 0,
    "zIndex": 3
  },
  "tr": {
    "borderBottom": "1px solid var(--fmed-border)",
    "minHeight": "40px",
    "background": "var(--fmed-surface-solid)",
    "color": "var(--fmed-text)"
  },
  "td": {
    "padding": "15px 14px",
    "borderBottom": "1px solid rgba(88,126,151,.20)",
    "fontSize": 12,
    "fontWeight": 800,
    "color": "var(--fmed-text)",
    "lineHeight": 1.35,
    "whiteSpace": "normal",
    "overflowWrap": "anywhere",
    "verticalAlign": "middle",
    "minHeight": "40px",
    "borderColor": "rgba(31,174,156,.12)",
    "background": "transparent",
    "textTransform": "uppercase"
  },
  "tdCode": {
    "padding": "8px 12px",
    "color": "var(--fmed-primary)",
    "fontSize": "13px",
    "fontWeight": 850,
    "verticalAlign": "middle",
    "whiteSpace": "normal",
    "overflowWrap": "anywhere",
    "minHeight": "40px",
    "lineHeight": "18px"
  },
  "statusDot": {
    "display": "inline-block",
    "width": "9px",
    "height": "9px",
    "borderRadius": "50%",
    "marginRight": "8px",
    "boxShadow": "0 0 14px currentColor"
  },
  "chartBox": {
    "marginTop": "16px"
  },
  "chartRow": {
    "marginBottom": "13px"
  },
  "chartLabel": {
    "display": "flex",
    "justifyContent": "space-between",
    "gap": "14px",
    "color": "var(--fmed-text)",
    "fontSize": "13px",
    "lineHeight": "18px",
    "fontWeight": 400,
    "marginBottom": "7px"
  },
  "chartValue": {
    "color": "var(--fmed-text)",
    "fontSize": "13px",
    "fontWeight": 400,
    "whiteSpace": "nowrap"
  },
  "barBack": {
    "width": "100%",
    "height": "9px",
    "background": "rgba(145,160,137,.16)",
    "borderRadius": "20px",
    "overflow": "hidden"
  },
  "barFill": {
    "height": "9px",
    "background": "linear-gradient(90deg, var(--fmed-sage), var(--fmed-sage-dark))",
    "borderRadius": "20px"
  },
  "trClickable": {
    "borderBottom": "1px solid var(--fmed-border)",
    "cursor": "pointer",
    "transition": "background .15s ease, transform .15s ease",
    "background": "var(--fmed-surface-solid)"
  },
  "modalOverlayTop": {
    "position": "fixed",
    "inset": 0,
    "background": "rgba(4, 12, 18, .58)",
    "zIndex": 20000,
    "display": "flex",
    "alignItems": "center",
    "justifyContent": "center",
    "padding": "12px",
    "boxSizing": "border-box",
    "backdropFilter": "blur(8px)",
    "overflow": "hidden"
  },
  "assetHeroPanel": {
    "display": "grid",
    "justifyContent": "space-between",
    "alignItems": "stretch",
    "gap": 18,
    "margin": "0 0 18px",
    "padding": "24px",
    "borderRadius": 28,
    "background": "var(--fmed-d3-hero)",
    "border": "1px solid var(--fmed-d3-border)",
    "boxShadow": "var(--fmed-d3-shadow-soft)",
    "minHeight": 146,
    "color": "var(--fmed-d3-text)",
    "overflow": "hidden",
    "gridTemplateColumns": "minmax(0, 1fr) minmax(240px, 320px)",
    "textTransform": "uppercase"
  },
  "assetHeroTitle": {
    "margin": "6px 0 0",
    "color": "var(--fmed-d3-title)",
    "fontSize": "clamp(30px, 2.3vw, 40px)",
    "lineHeight": 1.05,
    "fontWeight": 500,
    "letterSpacing": "-.045em",
    "textShadow": "none",
    "textTransform": "uppercase",
    "WebkitTextFillColor": "var(--fmed-d3-title)"
  },
  "assetHeroSubtitle": {
    "margin": 0,
    "color": "var(--fmed-d3-muted)",
    "fontSize": 14,
    "fontWeight": 750,
    "lineHeight": 1.48,
    "maxWidth": 860,
    "textTransform": "uppercase",
    "WebkitTextFillColor": "var(--fmed-d3-muted)"
  },
  "assetHeroBadge": {
    "minWidth": "130px",
    "textAlign": "center",
    "padding": "12px 16px",
    "borderRadius": "14px",
    "background": "var(--fmed-btn)",
    "color": "#FFFFFF",
    "fontSize": "15px",
    "fontWeight": 400,
    "boxShadow": "0 8px 20px rgba(143,158,139,.20)"
  },
  "assetKpiGrid": {
    "display": "grid",
    "gridTemplateColumns": "repeat(4, minmax(0, 1fr))",
    "gap": 14,
    "margin": "18px 0 18px 0",
    "marginTop": 14
  },
  "assetKpiCard": {
    "background": "var(--fmed-d3-card)",
    "border": "1px solid var(--fmed-d3-border)",
    "borderRadius": 24,
    "padding": 18,
    "boxShadow": "var(--fmed-d3-shadow-soft)",
    "minHeight": 124,
    "display": "flex",
    "flexDirection": "column",
    "justifyContent": "space-between",
    "color": "var(--fmed-d3-text)",
    "overflow": "hidden",
    "textTransform": "uppercase",
    "textShadow": "none"
  },
  "assetKpiHint": {
    "color": "var(--fmed-d3-muted)",
    "fontSize": 12,
    "fontWeight": 400,
    "marginTop": "8px",
    "lineHeight": "17px",
    "WebkitTextFillColor": "var(--fmed-d3-muted)"
  },
  "assetBigBtn": {
    "padding": "12px 18px",
    "minWidth": "185px",
    "borderRadius": "13px",
    "border": "none",
    "background": "linear-gradient(135deg,#169C8F,#165A52)",
    "color": "#FFFFFF",
    "fontWeight": 400,
    "fontSize": "13px",
    "cursor": "pointer",
    "boxShadow": "0 8px 20px rgba(30,90,168,.20)"
  },
  "assetBigBtnSecondary": {
    "padding": "12px 18px",
    "minWidth": "160px",
    "borderRadius": "13px",
    "border": "1px solid var(--fmed-border)",
    "background": "var(--fmed-soft-btn-bg)",
    "color": "var(--fmed-soft-btn-text)",
    "fontWeight": 400,
    "fontSize": "13px",
    "cursor": "pointer",
    "boxShadow": "0 8px 18px rgba(30,90,168,.10)"
  },
  "assetQuickPanel": {
    "display": "flex",
    "justifyContent": "space-between",
    "alignItems": "center",
    "gap": "16px",
    "margin": "6px 0 18px 0",
    "padding": "20px 22px",
    "borderRadius": "20px",
    "background": "var(--fmed-soft-gradient)",
    "border": "1px solid var(--fmed-border)",
    "boxShadow": "0 12px 30px rgba(61,58,53,.08)"
  },
  "assetQuickTitle": {
    "margin": 0,
    "color": "var(--fmed-text)",
    "fontSize": "20px",
    "fontWeight": 400
  },
  "assetQuickText": {
    "margin": "6px 0 0 0",
    "color": "var(--fmed-muted)",
    "fontSize": "14px",
    "fontWeight": 400,
    "lineHeight": "1.45"
  },
  "assetFilterSummary": {
    "display": "flex",
    "alignItems": "center",
    "gap": "8px",
    "flexWrap": "wrap",
    "margin": "2px 0 12px 0",
    "padding": "10px 12px",
    "borderRadius": "14px",
    "background": "rgba(238,247,255,.70)",
    "border": "1px solid var(--fmed-border)",
    "color": "var(--fmed-muted)",
    "fontSize": "12px",
    "fontWeight": 400
  },
  "assetAnalysisGrid": {
    "display": "grid",
    "gridTemplateColumns": "repeat(4, minmax(0,1fr))",
    "gap": 12,
    "marginBottom": 18
  },
  "assetRankList": {
    "display": "grid",
    "flexDirection": "column",
    "gap": 8
  },
  "assetRankRow": {
    "display": "flex",
    "justifyContent": "space-between",
    "alignItems": "center",
    "gap": 10,
    "padding": "7px 10px",
    "borderRadius": 12,
    "background": "var(--fmed-surface-solid)",
    "border": "1px solid var(--fmed-border)",
    "color": "var(--fmed-text)",
    "fontSize": 13,
    "fontWeight": 800,
    "minHeight": 34
  },
  "assetListHeader": {
    "display": "flex",
    "justifyContent": "space-between",
    "alignItems": "flex-start",
    "gap": 14,
    "marginBottom": 12,
    "flexWrap": "wrap"
  },
  "tableLarge": {
    "width": "100%",
    "borderCollapse": "separate",
    "borderSpacing": 0,
    "fontSize": 14,
    "color": "var(--fmed-d3-text)",
    "background": "transparent",
    "WebkitTextFillColor": "var(--fmed-text)",
    "minWidth": 1360,
    "textTransform": "uppercase"
  },
  "thLarge": {
    "padding": "14px 12px",
    "background": "var(--fmed-d3-soft)",
    "color": "var(--fmed-d3-muted)",
    "textAlign": "left",
    "fontSize": 11,
    "fontWeight": 500,
    "textTransform": "uppercase",
    "borderBottom": "1px solid var(--fmed-d3-border)",
    "letterSpacing": ".08em",
    "fontStyle": "normal",
    "height": "40px",
    "lineHeight": 1.15,
    "whiteSpace": "nowrap",
    "position": "sticky",
    "top": 0,
    "zIndex": 3,
    "minHeight": "46px",
    "WebkitTextFillColor": "var(--fmed-d3-muted)"
  },
  "tdLarge": {
    "padding": "14px 12px",
    "borderBottom": "1px solid var(--fmed-d3-border)",
    "fontSize": 13,
    "fontWeight": 800,
    "color": "var(--fmed-d3-text)",
    "lineHeight": 1.35,
    "textTransform": "uppercase",
    "fontStyle": "normal",
    "overflowWrap": "anywhere",
    "minHeight": "40px",
    "background": "rgba(255,255,255,.00)",
    "verticalAlign": "middle",
    "maxWidth": 260,
    "overflow": "hidden",
    "textOverflow": "ellipsis",
    "whiteSpace": "normal",
    "WebkitTextFillColor": "var(--fmed-d3-text)"
  },
  "tdCodeLarge": {
    "padding": "14px 12px",
    "color": "#1FAE9C",
    "fontSize": 13,
    "fontWeight": 500,
    "verticalAlign": "middle",
    "borderBottom": "1px solid var(--fmed-d3-border)",
    "textTransform": "uppercase",
    "fontStyle": "normal",
    "whiteSpace": "nowrap",
    "minHeight": "40px",
    "lineHeight": 1.25,
    "overflowWrap": "anywhere",
    "letterSpacing": ".02em",
    "WebkitTextFillColor": "#1FAE9C"
  },
  "assetActionsHeader": {
    "display": "flex",
    "alignItems": "flex-start",
    "justifyContent": "space-between",
    "gap": "18px",
    "marginBottom": "18px"
  },
  "assetActionsTitle": {
    "margin": 0,
    "fontSize": "16px",
    "fontWeight": 400,
    "color": "var(--fmed-text)",
    "letterSpacing": "-0.02em"
  },
  "assetActionsSubtitle": {
    "margin": "6px 0 0 0",
    "fontSize": "13px",
    "color": "var(--fmed-muted)",
    "fontWeight": 400
  },
  "assetActionsCode": {
    "padding": "10px 14px",
    "borderRadius": "14px",
    "background": "var(--fmed-surface-solid)",
    "border": "1px solid var(--fmed-border)",
    "color": "var(--fmed-soft-btn-text)",
    "fontWeight": 400,
    "fontSize": "14px",
    "whiteSpace": "nowrap"
  },
  "assetActionBtnPrimary": {
    "border": "none",
    "background": "linear-gradient(135deg,#169C8F,#165A52)",
    "color": "#FFFFFF"
  },
  "assetActionIcon": {
    "fontSize": "19px",
    "lineHeight": 1
  },
  "assetActionsGrouped": {
    "display": "grid",
    "gridTemplateColumns": "repeat(2, minmax(0, 1fr))",
    "gap": "14px",
    "alignItems": "stretch"
  },
  "assetActionsGroupBlock": {
    "padding": "16px",
    "borderRadius": "12px",
    "background": "var(--fmed-surface-2)",
    "border": "1px solid var(--fmed-border)",
    "boxShadow": "none",
    "color": "var(--fmed-text)"
  },
  "assetActionsGroupTitle": {
    "marginBottom": "10px",
    "color": "var(--fmed-muted)",
    "fontSize": "12px",
    "fontWeight": 500,
    "letterSpacing": ".05em",
    "textTransform": "uppercase"
  },
  "assetActionsGroupGrid": {
    "display": "grid",
    "gap": "10px",
    "minWidth": 0,
    "gridTemplateColumns": "repeat(auto-fit, minmax(170px, 1fr))"
  },
  "linkEditBox": {
    "width": "100%",
    "marginTop": "16px",
    "padding": "18px",
    "borderRadius": "18px",
    "border": "1px solid var(--fmed-border)",
    "background": "var(--fmed-surface-2)",
    "boxSizing": "border-box",
    "color": "var(--fmed-text)"
  },
  "linkEditActions": {
    "display": "flex",
    "gap": "10px",
    "marginTop": "12px",
    "flexWrap": "wrap"
  },
  "assetHistoryCollapsible": {
    "marginTop": "22px",
    "borderRadius": "12px",
    "border": "1px solid var(--fmed-border)",
    "background": "var(--fmed-surface)",
    "boxShadow": "var(--fmed-shadow-sm)",
    "padding": "20px",
    "color": "var(--fmed-text)",
    "maxWidth": "100%",
    "overflow": "hidden"
  },
  "assetHistoryHeaderCompact": {
    "display": "flex",
    "alignItems": "center",
    "justifyContent": "space-between",
    "gap": "18px",
    "marginBottom": "0"
  },
  "historyFilterBar": {
    "display": "flex",
    "alignItems": "center",
    "gap": "12px",
    "flexWrap": "wrap",
    "paddingTop": "18px",
    "marginTop": "16px",
    "borderTop": "1px solid #E5EEF9"
  },
  "historyResultInfo": {
    "marginTop": "12px",
    "color": "var(--fmed-muted)",
    "fontSize": "12px",
    "fontWeight": 400
  },
  "tableWrapCompact": {
    "width": "100%",
    "overflowX": "auto",
    "maxHeight": "52vh",
    "overflowY": "auto",
    "marginTop": "12px",
    "border": "1px solid var(--fmed-border)",
    "borderRadius": 14,
    "background": "var(--fmed-surface)",
    "boxShadow": "var(--fmed-card-shadow-soft)",
    "overflow": "auto",
    "color": "var(--fmed-text)"
  },
  "assetHistoryHeader": {
    "display": "flex",
    "alignItems": "center",
    "justifyContent": "space-between",
    "gap": "12px",
    "marginTop": "0",
    "marginBottom": "8px",
    "padding": "10px 12px",
    "borderRadius": "17px",
    "background": "var(--fmed-surface-solid)",
    "border": "1px solid #DCE8F6",
    "boxShadow": "0 10px 22px rgba(14,27,66,0.05)"
  },
  "assetHistoryTitle": {
    "margin": 0,
    "fontSize": "21px",
    "fontWeight": 400,
    "color": "var(--fmed-text)"
  },
  "assetHistorySubtitle": {
    "margin": "3px 0 0 0",
    "fontSize": "14px",
    "color": "var(--fmed-muted)",
    "fontWeight": 400
  },
  "sectionTitle": {
    "marginTop": "0",
    "marginBottom": "10px",
    "fontSize": "18px",
    "fontWeight": 500,
    "color": "var(--fmed-text)",
    "lineHeight": "24px",
    "letterSpacing": 0
  },
  "detailGrid": {
    "display": "grid",
    "gridTemplateColumns": "repeat(3, 1fr)",
    "gap": "14px"
  },
  "analysisCard": {
    "background": "var(--fmed-surface)",
    "border": "1px solid var(--fmed-border)",
    "borderRadius": "22px",
    "padding": "20px",
    "marginBottom": "20px",
    "color": "var(--fmed-text)"
  },
  "analysisGrid": {
    "display": "grid",
    "gridTemplateColumns": "repeat(auto-fit, minmax(min(100%, 230px), 1fr))",
    "gap": "10px"
  },
  "analysisBox": {
    "background": "var(--fmed-surface-2)",
    "border": "1px solid var(--fmed-border)",
    "borderRadius": "18px",
    "padding": "15px",
    "textAlign": "center",
    "boxShadow": "none",
    "color": "var(--fmed-text)"
  },
  "analysisDescription": {
    "marginTop": "20px",
    "padding": "20px",
    "background": "rgba(31,174,156,.055)",
    "borderRadius": "14px",
    "border": "1px solid rgba(31,174,156,.16)",
    "color": "#EAF6FF"
  },
  "analysisLabel": {
    "display": "block",
    "fontSize": "11px",
    "color": "var(--fmed-muted)",
    "textTransform": "uppercase",
    "marginBottom": "8px",
    "fontWeight": 400
  },
  "analysisValue": {
    "display": "block",
    "fontSize": "24px",
    "fontWeight": 400,
    "color": "var(--fmed-text)"
  },
  "analysisBadge": {
    "display": "inline-flex",
    "alignItems": "center",
    "justifyContent": "center",
    "minWidth": "92px",
    "padding": "8px 14px",
    "borderRadius": "999px",
    "fontSize": "16px",
    "fontWeight": 400,
    "boxSizing": "border-box"
  },
  "criteriaGrid": {
    "display": "grid",
    "gridTemplateColumns": "repeat(2, minmax(0, 1fr))",
    "gap": "12px",
    "marginTop": "15px"
  },
  "criteriaBox": {
    "background": "rgba(6,21,32,.78)",
    "border": "1px solid rgba(31,174,156,.20)",
    "borderRadius": "14px",
    "padding": "14px",
    "lineHeight": "1.6",
    "boxSizing": "border-box",
    "color": "#EAF6FF"
  },
  "editPanel": {
    "width": "100%",
    "marginTop": "22px",
    "padding": "20px",
    "borderRadius": "22px",
    "background": "var(--fmed-surface)",
    "border": "1px solid var(--fmed-border)",
    "boxShadow": "var(--fmed-shadow-sm)",
    "boxSizing": "border-box",
    "color": "var(--fmed-text)"
  },
  "editGrid": {
    "display": "grid",
    "gridTemplateColumns": "repeat(auto-fit, minmax(240px, 1fr))",
    "gap": 14,
    "minWidth": 0
  },
  "editField": {
    "display": "flex",
    "flexDirection": "column",
    "gap": "8px"
  },
  "editLabel": {
    "fontSize": "11px",
    "fontWeight": 800,
    "color": "#7FE2CC",
    "textTransform": "uppercase",
    "lineHeight": "13px",
    "letterSpacing": ".11em"
  },
  "assetActionsBar": {
    "display": "flex",
    "gridTemplateColumns": "repeat(auto-fit, minmax(min(100%, 160px), 1fr))",
    "gap": 10,
    "margin": "14px 0 2px 0",
    "flexWrap": "wrap",
    "alignItems": "center",
    "maxWidth": "100%",
    "overflow": "hidden",
    "boxSizing": "border-box",
    "marginTop": 14,
    "paddingTop": 14,
    "borderTop": "1px solid var(--fmed-border)"
  },
  "headerActions": {
    "display": "flex",
    "gap": "12px",
    "alignItems": "center",
    "justifyContent": "flex-end",
    "flexWrap": "wrap"
  },
  "cancelBtn": {
    "padding": "14px 20px",
    "borderRadius": "14px",
    "border": "1px solid var(--fmed-border)",
    "background": "var(--fmed-surface-2)",
    "color": "var(--fmed-text)",
    "fontWeight": 500,
    "cursor": "pointer",
    "minHeight": "44px",
    "fontSize": "13px",
    "lineHeight": "16px",
    "letterSpacing": ".05em",
    "whiteSpace": "normal",
    "boxShadow": "none"
  },
  "saveBtn": {
    "padding": "14px 22px",
    "borderRadius": "14px",
    "border": "1px solid rgba(31,174,156,.46)",
    "background": "linear-gradient(135deg,#1FAE9C,#1FAE9C)",
    "color": "#02131F",
    "fontWeight": 900,
    "cursor": "pointer",
    "boxShadow": "0 16px 34px rgba(31,174,156,.18)",
    "minHeight": "44px",
    "fontSize": "13px",
    "lineHeight": "16px",
    "letterSpacing": ".05em",
    "whiteSpace": "normal"
  },
  "mutedSmall": {
    "color": "#AFC2D3",
    "fontSize": "12px",
    "fontWeight": 400
  },
  "docBtn": {
    "height": "34px",
    "minWidth": 98,
    "padding": "0 12px",
    "borderRadius": 10,
    "border": "1px solid var(--fmed-border)",
    "background": "var(--fmed-primary-soft)",
    "color": "var(--fmed-primary)",
    "fontSize": 11,
    "fontWeight": 950,
    "cursor": "pointer",
    "whiteSpace": "nowrap",
    "display": "inline-flex",
    "alignItems": "center",
    "justifyContent": "center",
    "minHeight": 40,
    "lineHeight": 1,
    "letterSpacing": ".035em",
    "textTransform": "uppercase",
    "fontStyle": "normal",
    "boxSizing": "border-box",
    "maxWidth": "90px",
    "overflow": "hidden"
  },
  "rowActionGroup": {
    "display": "flex",
    "flexDirection": "row",
    "gap": 8,
    "alignItems": "center",
    "justifyContent": "flex-end",
    "flexWrap": "nowrap"
  },
  "actionBtnEdit": {
    "height": "34px",
    "minWidth": 92,
    "padding": "0 12px",
    "borderRadius": 10,
    "border": "1px solid var(--fmed-border)",
    "background": "var(--fmed-primary-soft)",
    "color": "var(--fmed-primary)",
    "fontSize": 11,
    "fontWeight": 950,
    "cursor": "pointer",
    "whiteSpace": "nowrap",
    "display": "inline-flex",
    "alignItems": "center",
    "justifyContent": "center",
    "lineHeight": 1,
    "WebkitTextFillColor": "var(--fmed-primary)",
    "minHeight": 40,
    "gap": 6,
    "boxShadow": "none",
    "letterSpacing": ".035em",
    "textTransform": "uppercase"
  },
  "actionBtnDelete": {
    "height": "34px",
    "minWidth": 92,
    "padding": "0 12px",
    "borderRadius": 10,
    "border": "1px solid rgba(255,91,104,.48)",
    "background": "rgba(220,53,69,.12)",
    "color": "#FF5B68",
    "fontSize": 11,
    "fontWeight": 950,
    "cursor": "pointer",
    "whiteSpace": "nowrap",
    "display": "inline-flex",
    "alignItems": "center",
    "justifyContent": "center",
    "minHeight": 40,
    "boxShadow": "none",
    "letterSpacing": ".035em",
    "textTransform": "uppercase"
  },
  "docBtnDisabled": {
    "height": "34px",
    "minWidth": 98,
    "padding": "0 12px",
    "borderRadius": 10,
    "border": "1px solid var(--fmed-border)",
    "background": "var(--fmed-surface-2)",
    "color": "var(--fmed-muted)",
    "fontSize": 11,
    "fontWeight": 950,
    "cursor": "help",
    "whiteSpace": "nowrap",
    "minHeight": 40,
    "lineHeight": "16px",
    "letterSpacing": ".05em",
    "textTransform": "uppercase",
    "fontStyle": "normal",
    "boxSizing": "border-box",
    "maxWidth": "90px",
    "overflow": "hidden"
  },
  "selectionCounter": {
    "display": "inline-flex",
    "alignItems": "center",
    "padding": "10px 12px",
    "borderRadius": "14px",
    "background": "rgba(31,174,156,.08)",
    "color": "var(--fmed-primary)",
    "fontSize": "12px",
    "fontWeight": 400,
    "border": "1px solid rgba(31,174,156,.22)"
  },
  "modalOverlay": {
    "position": "fixed",
    "inset": 0,
    "background": "rgba(4, 12, 18, .58)",
    "backdropFilter": "blur(8px)",
    "display": "flex",
    "alignItems": "center",
    "justifyContent": "center",
    "zIndex": 15000,
    "padding": "12px",
    "boxSizing": "border-box",
    "overflow": "hidden"
  },
  "modalCard": {
    "width": "min(1840px, 96vw)",
    "maxHeight": "92vh",
    "overflowY": "auto",
    "overflowX": "hidden",
    "background": "var(--fmed-card-gradient)",
    "border": "1px solid var(--fmed-border)",
    "borderRadius": "26px",
    "padding": "24px",
    "boxShadow": "0 30px 90px rgba(0,0,0,.26)",
    "color": "var(--fmed-text)",
    "boxSizing": "border-box",
    "maxWidth": "1840px",
    "overflow": "auto",
    "height": "92vh"
  },
  "modalSmallCard": {
    "width": "min(920px, calc(100vw - 34px))",
    "maxHeight": "calc(100vh - 34px)",
    "overflowY": "auto",
    "overflowX": "hidden",
    "background": "var(--fmed-card-gradient)",
    "borderRadius": 28,
    "padding": "24px",
    "boxShadow": "0 30px 90px rgba(0,0,0,.26)",
    "border": "1px solid var(--fmed-border)",
    "position": "relative",
    "boxSizing": "border-box",
    "color": "var(--fmed-text)",
    "maxWidth": "min(560px, 96vw)",
    "overflow": "auto"
  },
  "closeBtn": {
    "position": "absolute",
    "top": "22px",
    "right": "22px",
    "height": "42px",
    "minWidth": "86px",
    "borderRadius": "14px",
    "border": "1px solid rgba(31,174,156,.24)",
    "background": "var(--fmed-surface)",
    "color": "var(--fmed-text)",
    "fontWeight": 500,
    "fontFamily": "\"Futura Light\", \"Futura PT\", Futura, \"Trebuchet MS\", Arial, sans-serif",
    "cursor": "pointer",
    "boxShadow": "none",
    "minHeight": "46px",
    "fontSize": "12px",
    "letterSpacing": ".05em"
  },
  "modalTitle": {
    "margin": "0 0 22px",
    "fontSize": "clamp(22px, 2.2vw, 32px)",
    "letterSpacing": "-.045em",
    "color": "var(--fmed-text)",
    "fontWeight": 950,
    "fontFamily": "\"Futura Light\", \"Futura PT\", Futura, \"Trebuchet MS\", Arial, sans-serif",
    "maxWidth": "100%",
    "overflowWrap": "anywhere",
    "lineHeight": 1.05,
    "marginBottom": "18px"
  },
  "assetHeroCard": {
    "display": "flex",
    "alignItems": "center",
    "justifyContent": "space-between",
    "gap": "14px",
    "background": "var(--fmed-surface-solid)",
    "border": "1px solid rgba(20,32,51,.08)",
    "borderRadius": "12px",
    "padding": "18px",
    "marginBottom": "8px",
    "boxShadow": "0 3px 10px rgba(15,23,42,.04)"
  },
  "assetHeroLeft": {
    "flex": 1,
    "minWidth": 0,
    "gap": 7,
    "display": "flex",
    "flexDirection": "column",
    "justifyContent": "center"
  },
  "assetHeroIcon": {
    "width": "48px",
    "height": "48px",
    "borderRadius": "17px",
    "background": "linear-gradient(135deg,#8F9E8B 0%,#7C8B79 100%)",
    "color": "#fff",
    "display": "flex",
    "alignItems": "center",
    "justifyContent": "center",
    "fontSize": "22px",
    "boxShadow": "0 12px 24px rgba(143,158,139,.24)"
  },
  "assetHeroLabel": {
    "fontSize": "13px",
    "fontWeight": 400,
    "color": "#2b4770",
    "textTransform": "uppercase",
    "letterSpacing": ".4px"
  },
  "assetHeroCode": {
    "fontSize": "29px",
    "lineHeight": "31px",
    "fontWeight": 400,
    "color": "var(--fmed-text)",
    "letterSpacing": "-1px"
  },
  "assetHeroActions": {
    "display": "grid",
    "gridTemplateColumns": "repeat(5, minmax(132px, 1fr))",
    "gap": "10px",
    "flex": 1
  },
  "assetTopBtn": {
    "height": "34px",
    "borderRadius": "12px",
    "border": "1px solid var(--fmed-border)",
    "background": "var(--fmed-surface-solid)",
    "color": "var(--fmed-text)",
    "fontWeight": 400,
    "fontSize": "11px",
    "fontFamily": "\"Futura Light\", \"Futura PT\", Futura, \"Trebuchet MS\", Arial, sans-serif",
    "cursor": "pointer",
    "boxShadow": "0 6px 16px rgba(0,31,91,.045)",
    "whiteSpace": "nowrap"
  },
  "assetTopBtnPrimary": {
    "background": "linear-gradient(135deg,#8F9E8B 0%,#7C8B79 100%)",
    "color": "#fff",
    "border": "none",
    "boxShadow": "0 14px 28px rgba(143,158,139,.24)"
  },
  "assetKpiRibbon": {
    "display": "grid",
    "gridTemplateColumns": "repeat(5, 1fr)",
    "gap": "0",
    "background": "var(--fmed-surface-solid)",
    "border": "1px solid var(--fmed-border)",
    "borderRadius": "19px",
    "padding": "6px 10px",
    "marginBottom": "8px",
    "boxShadow": "0 10px 24px rgba(0,31,91,.055)"
  },
  "assetKpiItem": {
    "display": "flex",
    "alignItems": "center",
    "gap": "10px",
    "padding": "6px 12px",
    "borderRight": "1px solid #dbe8f7"
  },
  "assetKpiIconGreen": {
    "width": "36px",
    "height": "36px",
    "borderRadius": "14px",
    "display": "flex",
    "alignItems": "center",
    "justifyContent": "center",
    "fontSize": "16px",
    "background": "#e7f8ef"
  },
  "assetKpiIconBlue": {
    "width": "36px",
    "height": "36px",
    "borderRadius": "14px",
    "display": "flex",
    "alignItems": "center",
    "justifyContent": "center",
    "fontSize": "16px",
    "background": "#eaf2ff"
  },
  "assetKpiIconPurple": {
    "width": "36px",
    "height": "36px",
    "borderRadius": "14px",
    "display": "flex",
    "alignItems": "center",
    "justifyContent": "center",
    "fontSize": "16px",
    "background": "#f1e9ff"
  },
  "assetKpiIconOrange": {
    "width": "36px",
    "height": "36px",
    "borderRadius": "14px",
    "display": "flex",
    "alignItems": "center",
    "justifyContent": "center",
    "fontSize": "16px",
    "background": "var(--fmed-surface-soft)"
  },
  "assetKpiLabel": {
    "color": "var(--fmed-d3-muted)",
    "fontSize": 12,
    "fontWeight": 500,
    "textTransform": "uppercase",
    "letterSpacing": ".08em",
    "lineHeight": "13px",
    "WebkitTextFillColor": "var(--fmed-d3-muted)"
  },
  "assetKpiValue": {
    "display": "block",
    "color": "var(--fmed-d3-title)",
    "fontSize": "clamp(30px, 2vw, 38px)",
    "lineHeight": 1.05,
    "fontWeight": 500,
    "letterSpacing": "-.04em",
    "marginTop": 12,
    "WebkitTextFillColor": "var(--fmed-d3-title)"
  },
  "assetKpiValueSmall": {
    "marginTop": "2px",
    "fontSize": "15px",
    "fontWeight": 400,
    "color": "var(--fmed-text)"
  },
  "assetMainGrid": {
    "display": "grid",
    "gridTemplateColumns": "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
    "gap": "14px",
    "alignItems": "stretch",
    "marginBottom": "12px"
  },
  "assetPanel": {
    "background": "var(--fmed-surface-solid)",
    "border": "1px solid rgba(20,32,51,.08)",
    "borderRadius": "12px",
    "padding": "18px",
    "boxShadow": "0 3px 10px rgba(15,23,42,.04)",
    "overflow": "hidden"
  },
  "assetPanelCompact": {
    "background": "var(--fmed-surface-solid)",
    "border": "1px solid var(--fmed-border)",
    "borderRadius": "17px",
    "padding": "9px 12px",
    "boxShadow": "0 10px 24px rgba(0,31,91,.052)",
    "overflow": "hidden",
    "marginBottom": "10px"
  },
  "assetInfoTable": {
    "display": "grid",
    "gridTemplateColumns": "1fr",
    "gap": 0
  },
  "detailItem": {
    "display": "grid",
    "gridTemplateColumns": "128px 1fr",
    "alignItems": "center",
    "padding": "12px",
    "borderBottom": "1px solid var(--fmed-border)",
    "minHeight": "22px",
    "borderRadius": "12px"
  },
  "detailLabel": {
    "fontSize": "11px",
    "color": "#64748b",
    "fontWeight": 500,
    "letterSpacing": ".05em"
  },
  "detailValue": {
    "fontSize": "13px",
    "color": "var(--fmed-text)",
    "fontWeight": 400,
    "wordBreak": "break-word",
    "lineHeight": "18px"
  },
  "fmeaGrid": {
    "display": "grid",
    "gridTemplateColumns": "1fr 1fr",
    "gap": "11px",
    "height": "calc(100% - 32px)"
  },
  "fmeaBox": {
    "border": "1px solid var(--fmed-border)",
    "borderRadius": "14px",
    "background": "var(--fmed-card-gradient)",
    "minHeight": "138px",
    "display": "flex",
    "flexDirection": "column",
    "alignItems": "center",
    "justifyContent": "center",
    "gap": "7px",
    "padding": "16px 12px",
    "textAlign": "center",
    "color": "var(--fmed-text)",
    "fontSize": "15px",
    "transition": "transform .18s ease, box-shadow .18s ease"
  },
  "predictivePanel": {
    "background": "linear-gradient(180deg, rgba(255,255,255,.98) 0%, rgba(246,250,252,.98) 100%)",
    "borderWidth": "1px",
    "borderStyle": "solid"
  },
  "predictiveHeader": {
    "display": "flex",
    "alignItems": "flex-start",
    "justifyContent": "space-between",
    "gap": "12px",
    "marginBottom": "14px",
    "flexWrap": "wrap"
  },
  "predictiveSubtitle": {
    "fontSize": "12px",
    "lineHeight": 1.4,
    "color": "var(--fmed-muted)",
    "maxWidth": "460px"
  },
  "predictiveSummaryPill": {
    "minHeight": "30px",
    "padding": "6px 10px",
    "borderRadius": "999px",
    "fontSize": "11px",
    "lineHeight": 1.2,
    "fontWeight": 600,
    "letterSpacing": ".03em",
    "textTransform": "uppercase",
    "whiteSpace": "nowrap"
  },
  "predictiveIcon": {
    "width": "36px",
    "height": "36px",
    "borderRadius": "12px",
    "display": "inline-flex",
    "alignItems": "center",
    "justifyContent": "center",
    "fontSize": "17px"
  },
  "predictiveMetricLabel": {
    "fontSize": "11px",
    "lineHeight": 1.2,
    "color": "var(--fmed-muted)",
    "fontWeight": 600,
    "letterSpacing": ".06em",
    "textTransform": "uppercase"
  },
  "predictiveMetricHint": {
    "fontSize": "10.5px",
    "lineHeight": 1.25,
    "color": "var(--fmed-muted)"
  },
  "predictiveProgressTrack": {
    "width": "78%",
    "maxWidth": "150px",
    "height": "7px",
    "borderRadius": "999px",
    "overflow": "hidden",
    "background": "rgba(15,23,42,.10)",
    "marginTop": "2px"
  },
  "predictiveProgressFill": {
    "display": "block",
    "height": "100%",
    "borderRadius": "inherit",
    "minWidth": "4px",
    "transition": "width .25s ease"
  },
  "dashboardIntroCompact": {
    "minHeight": "auto",
    "padding": "16px",
    "borderRadius": "14px",
    "gap": "4px",
    "marginBottom": "12px"
  },
  "dashboardIntroTitle": {
    "margin": "6px 0 4px",
    "fontSize": "18px",
    "lineHeight": "23px",
    "fontWeight": 500,
    "color": "var(--fmed-text)",
    "letterSpacing": 0
  },
  "dashboardIntroText": {
    "margin": 0,
    "maxWidth": "1120px",
    "fontSize": "12px",
    "lineHeight": "18px",
    "color": "var(--fmed-muted)",
    "fontWeight": 400
  },
  "dashboardIntroGrid": {
    "display": "grid",
    "gridTemplateColumns": "repeat(3, minmax(0, 1fr))",
    "gap": "8px",
    "marginTop": "8px"
  },
  "dashboardIntroMiniBox": {
    "border": "1px solid rgba(20,32,51,.08)",
    "borderRadius": "12px",
    "padding": "8px 10px",
    "minHeight": "38px",
    "fontSize": "11.5px",
    "lineHeight": 1.25,
    "color": "var(--fmed-muted)",
    "display": "flex",
    "flexDirection": "column",
    "gap": "2px",
    "overflowWrap": "anywhere",
    "boxShadow": "none"
  },
  "recommendationPanel": {
    "background": "var(--fmed-surface-solid)",
    "border": "1px solid rgba(20,32,51,.08)",
    "borderRadius": "12px",
    "padding": "18px",
    "marginBottom": "8px",
    "boxShadow": "0 3px 10px rgba(15,23,42,.04)"
  },
  "recommendationGrid": {
    "display": "grid",
    "gridTemplateColumns": "1fr 1fr 1fr",
    "gap": "8px"
  },
  "recommendationStack": {
    "display": "grid",
    "gridTemplateColumns": "1fr",
    "gap": "8px"
  },
  "recommendationBox": {
    "border": "1px solid rgba(0,0,0,.08)",
    "borderRadius": "12px",
    "padding": "20px",
    "minHeight": "74px",
    "background": "var(--fmed-card-gradient)",
    "color": "var(--fmed-text)",
    "fontSize": "11.5px",
    "lineHeight": "1.28",
    "fontWeight": 400,
    "boxShadow": "none",
    "overflowWrap": "anywhere"
  },
  "recommendationBoxInfo": {
    "background": "linear-gradient(180deg,#F5FAFF 0%,#EFF8FF 100%)",
    "borderColor": "#B2DDFF",
    "boxShadow": "inset 4px 0 0 #2E90FA"
  },
  "recommendationBoxTechnical": {
    "background": "linear-gradient(180deg,#F9F5FF 0%,#F4EBFF 100%)",
    "borderColor": "#D6BBFB",
    "boxShadow": "inset 4px 0 0 #9E77ED"
  },
  "recommendationBoxCalculation": {
    "background": "linear-gradient(180deg,#FFFAEB 0%,#FEF0C7 100%)",
    "borderColor": "#FEDF89",
    "boxShadow": "inset 4px 0 0 #F79009"
  },
  "recommendationBoxCompact": {
    "border": "1px solid var(--fmed-border)",
    "borderRadius": "14px",
    "padding": "8px 10px",
    "minHeight": "58px",
    "background": "var(--fmed-card-gradient)",
    "color": "var(--fmed-text)",
    "fontSize": "10.5px",
    "lineHeight": "1.28",
    "fontWeight": 400
  },
  "recommendationTitle": {
    "color": "#6F846C",
    "fontWeight": 400,
    "textTransform": "uppercase",
    "marginBottom": "4px",
    "fontSize": "13px"
  },
  "assetActionsPanel": {
    "background": "var(--fmed-surface-solid)",
    "border": "1px solid rgba(20,32,51,.08)",
    "borderRadius": "12px",
    "padding": "18px",
    "boxShadow": "0 3px 10px rgba(15,23,42,.04)",
    "marginTop": "10px",
    "marginBottom": "12px"
  },
  "assetActionsHeaderCompact": {
    "display": "flex",
    "alignItems": "center",
    "justifyContent": "space-between",
    "gap": "14px",
    "marginBottom": "12px"
  },
  "assetActionsGrid": {
    "display": "grid",
    "gridTemplateColumns": "repeat(auto-fit, minmax(min(100%, 178px), 1fr))",
    "gap": "10px"
  },
  "assetActionBtn": {
    "minHeight": "54px",
    "borderRadius": "12px",
    "border": "1px solid var(--fmed-border)",
    "background": "var(--fmed-surface-solid)",
    "color": "var(--fmed-text)",
    "fontWeight": 500,
    "fontSize": "13px",
    "fontFamily": "\"Futura Light\", \"Futura PT\", Futura, \"Trebuchet MS\", Arial, sans-serif",
    "cursor": "pointer",
    "display": "flex",
    "alignItems": "center",
    "justifyContent": "center",
    "gap": "9px",
    "padding": "8px 12px",
    "whiteSpace": "nowrap",
    "overflow": "hidden",
    "textAlign": "center",
    "lineHeight": 1.16,
    "minWidth": 0,
    "letterSpacing": ".05em",
    "boxShadow": "none",
    "overflowWrap": "anywhere"
  },
  "assetActionBtnEdit": {
    "background": "linear-gradient(135deg,#8F9E8B 0%,#7C8B79 100%)",
    "color": "#fff",
    "border": "none"
  },
  "assetActionBtnDanger": {
    "background": "var(--fmed-surface-soft)",
    "border": "1px solid #D8D2C7",
    "color": "#A66C61"
  },
  "assetActionBtnDelete": {
    "background": "linear-gradient(135deg,#C98A7D 0%,#B9776A 100%)",
    "color": "#fff",
    "border": "none"
  },
  "historyTableWrap": {
    "border": "1px solid var(--fmed-border)",
    "borderRadius": "14px",
    "overflow": "hidden",
    "background": "var(--fmed-surface-solid)"
  },
  "primaryBtn": {
    "minHeight": 42,
    "padding": "10px 15px",
    "borderRadius": 10,
    "border": "1px solid rgba(124,199,205,.22)",
    "background": "var(--fmed-btn)",
    "color": "#FFFFFF",
    "fontSize": "13px",
    "fontWeight": 950,
    "cursor": "pointer",
    "boxShadow": "var(--fmed-btn-shadow)",
    "whiteSpace": "nowrap",
    "overflow": "visible",
    "lineHeight": "17px",
    "letterSpacing": ".04em",
    "WebkitTextFillColor": "#FFFFFF",
    "textTransform": "uppercase"
  },
  "secondaryBtn": {
    "minHeight": 42,
    "borderRadius": 10,
    "border": "1px solid var(--fmed-border)",
    "background": "var(--fmed-surface-2)",
    "color": "var(--fmed-text)",
    "fontWeight": 950,
    "fontSize": "13px",
    "fontFamily": "\"Futura Light\", \"Futura PT\", Futura, \"Trebuchet MS\", Arial, sans-serif",
    "cursor": "pointer",
    "padding": "10px 14px",
    "whiteSpace": "nowrap",
    "overflow": "visible",
    "boxShadow": "var(--fmed-card-shadow-soft)",
    "lineHeight": "17px",
    "letterSpacing": ".04em",
    "WebkitTextFillColor": "var(--fmed-text)",
    "textTransform": "uppercase"
  },
  "dictionaryGrid": {
    "display": "grid",
    "gridTemplateColumns": "repeat(auto-fit, minmax(360px, 1fr))",
    "gap": "14px",
    "alignItems": "start"
  },
  "dictionaryBox": {
    "background": "var(--fmed-surface-solid)",
    "border": "1px solid rgba(0,0,0,.08)",
    "borderRadius": "12px",
    "padding": "20px",
    "boxShadow": "0 4px 14px rgba(0,0,0,.05)",
    "minHeight": "auto",
    "boxSizing": "border-box",
    "overflow": "hidden"
  },
  "dictionaryBoxOpen": {
    "boxShadow": "0 18px 38px rgba(0,31,91,.10)"
  },
  "dictionaryAccordionHeader": {
    "width": "100%",
    "border": "none",
    "background": "transparent",
    "color": "var(--fmed-text)",
    "display": "flex",
    "alignItems": "center",
    "justifyContent": "space-between",
    "gap": "12px",
    "cursor": "pointer",
    "textAlign": "left",
    "padding": "4px 2px",
    "fontFamily": "\"Futura Light\", \"Futura PT\", Futura, \"Trebuchet MS\", Arial, sans-serif"
  },
  "dictionaryAccordionLeft": {
    "display": "flex",
    "alignItems": "center",
    "gap": "12px",
    "minWidth": 0
  },
  "dictionaryAccordionIcon": {
    "width": "34px",
    "height": "34px",
    "borderRadius": "12px",
    "background": "var(--fmed-surface-soft)",
    "border": "1px solid var(--fmed-border)",
    "display": "flex",
    "alignItems": "center",
    "justifyContent": "center",
    "color": "var(--fmed-accent)",
    "fontWeight": 400,
    "flex": "0 0 auto"
  },
  "dictionaryAccordionTitle": {
    "margin": 0,
    "fontSize": "15px",
    "lineHeight": 1.15,
    "color": "var(--fmed-text)",
    "fontWeight": 400
  },
  "dictionaryAccordionSubtitle": {
    "marginTop": "4px",
    "color": "var(--fmed-muted)",
    "fontSize": "11px",
    "fontWeight": 400
  },
  "dictionaryAccordionRight": {
    "display": "flex",
    "alignItems": "center",
    "gap": "8px",
    "flex": "0 0 auto"
  },
  "dictionaryAccordionBadge": {
    "border": "1px solid var(--fmed-border)",
    "background": "var(--fmed-surface-soft)",
    "color": "var(--fmed-muted)",
    "borderRadius": "999px",
    "padding": "4px 9px",
    "fontSize": "10px",
    "fontWeight": 400,
    "textTransform": "uppercase"
  },
  "dictionaryAccordionChevron": {
    "color": "var(--fmed-accent)",
    "fontSize": "12px",
    "fontWeight": 400
  },
  "dictionaryAccordionContent": {
    "marginTop": "14px",
    "paddingTop": "14px",
    "borderTop": "1px solid var(--fmed-border)"
  },
  "dictionaryPreview": {
    "display": "flex",
    "flexWrap": "wrap",
    "gap": "7px",
    "marginTop": "12px",
    "maxHeight": "78px",
    "overflowY": "auto",
    "overflowX": "hidden",
    "paddingRight": "6px",
    "alignContent": "flex-start"
  },
  "dictionaryChip": {
    "border": "1px solid var(--fmed-border)",
    "background": "var(--fmed-surface-soft)",
    "color": "var(--fmed-text)",
    "borderRadius": "999px",
    "padding": "5px 6px 5px 10px",
    "fontSize": "10.5px",
    "fontWeight": 400,
    "display": "inline-flex",
    "alignItems": "center",
    "gap": "5px",
    "maxWidth": "calc(100% - 4px)",
    "minWidth": 0
  },
  "dictionaryChipRemove": {
    "width": "18px",
    "height": "18px",
    "borderRadius": "999px",
    "border": "1px solid #ffb5bd",
    "background": "var(--fmed-danger-bg)",
    "color": "#d81725",
    "fontSize": "14px",
    "fontWeight": 400,
    "lineHeight": "14px",
    "cursor": "pointer",
    "display": "inline-flex",
    "alignItems": "center",
    "justifyContent": "center",
    "padding": 0
  },
  "dictionaryChipText": {
    "maxWidth": "190px",
    "overflow": "hidden",
    "textOverflow": "ellipsis",
    "whiteSpace": "nowrap",
    "minWidth": 0
  },
  "dictionaryChipEdit": {
    "width": "18px",
    "height": "18px",
    "borderRadius": "999px",
    "border": "1px solid #b9c7ff",
    "background": "#f1f4ff",
    "color": "#78684F",
    "fontSize": "11px",
    "lineHeight": "16px",
    "fontWeight": 400,
    "cursor": "pointer",
    "display": "inline-flex",
    "alignItems": "center",
    "justifyContent": "center",
    "padding": 0
  },
  "dictionaryChipEditing": {
    "borderRadius": "14px",
    "padding": "6px",
    "width": "100%",
    "background": "var(--fmed-surface-solid)"
  },
  "dictionaryInlineInput": {
    "flex": 1,
    "minWidth": "120px",
    "border": "1px solid #b9c7ff",
    "borderRadius": "10px",
    "padding": "7px 9px",
    "fontSize": "12px",
    "fontWeight": 400,
    "color": "var(--fmed-text)",
    "outline": "none"
  },
  "dictionaryChipSave": {
    "width": "24px",
    "height": "24px",
    "borderRadius": "999px",
    "border": "1px solid #8fe5b6",
    "background": "#eafff3",
    "color": "#087b3d",
    "fontWeight": 400,
    "cursor": "pointer"
  },
  "dictionaryChipCancel": {
    "width": "24px",
    "height": "24px",
    "borderRadius": "999px",
    "border": "1px solid #d6dff2",
    "background": "#f6f8fc",
    "color": "#33405f",
    "fontWeight": 400,
    "cursor": "pointer"
  },
  "exportAccordionItem": {
    "border": "1px solid var(--fmed-border)",
    "borderRadius": 22,
    "background": "var(--fmed-card-gradient)",
    "overflow": "hidden",
    "boxShadow": "var(--fmed-card-shadow-soft)",
    "color": "var(--fmed-text)",
    "WebkitTextFillColor": "var(--fmed-text)",
    "marginBottom": 10
  },
  "exportAccordionHeader": {
    "width": "100%",
    "border": 0,
    "background": "transparent",
    "padding": "14px 16px",
    "display": "flex",
    "alignItems": "center",
    "justifyContent": "space-between",
    "gap": 14,
    "cursor": "pointer",
    "textAlign": "left",
    "color": "var(--fmed-text)",
    "minHeight": 68,
    "borderRadius": "12px",
    "borderBottom": "1px solid var(--fmed-border)",
    "WebkitTextFillColor": "var(--fmed-text)",
    "boxShadow": "none"
  },
  "exportAccordionTitleWrap": {
    "display": "flex",
    "alignItems": "center",
    "gap": 12,
    "minWidth": 0,
    "justifyContent": "flex-start",
    "width": "auto",
    "flex": 1
  },
  "exportAccordionIcon": {
    "width": 42,
    "height": 42,
    "borderRadius": 15,
    "display": "inline-flex",
    "alignItems": "center",
    "justifyContent": "center",
    "background": "color-mix(in srgb, var(--fmed-primary) 11%, var(--fmed-surface-solid))",
    "border": "1px solid color-mix(in srgb, var(--fmed-primary) 20%, var(--fmed-border))",
    "boxShadow": "none",
    "flex": "0 0 auto",
    "fontSize": 18,
    "minWidth": 42,
    "color": "var(--fmed-primary)",
    "WebkitTextFillColor": "var(--fmed-primary)"
  },
  "exportAccordionTitle": {
    "fontSize": 15,
    "fontWeight": 950,
    "color": "var(--fmed-text)",
    "lineHeight": 1.15,
    "WebkitTextFillColor": "var(--fmed-text)",
    "textTransform": "uppercase",
    "letterSpacing": "-.02em"
  },
  "exportAccordionSubtitle": {
    "marginTop": 3,
    "fontSize": 12,
    "fontWeight": 750,
    "color": "var(--fmed-muted)",
    "lineHeight": 1.25,
    "WebkitTextFillColor": "var(--fmed-muted)",
    "textTransform": "uppercase"
  },
  "exportAccordionChevron": {
    "width": 36,
    "height": 36,
    "borderRadius": 999,
    "display": "flex",
    "alignItems": "center",
    "justifyContent": "center",
    "border": "1px solid var(--fmed-border)",
    "background": "var(--fmed-surface-soft)",
    "color": "var(--fmed-primary)",
    "fontSize": 12,
    "fontWeight": 900,
    "flex": "0 0 auto",
    "minWidth": 36,
    "letterSpacing": ".05em",
    "textAlign": "right",
    "WebkitTextFillColor": "var(--fmed-primary)",
    "boxShadow": "none",
    "padding": "8px 11px",
    "whiteSpace": "nowrap"
  },
  "exportAccordionBody": {
    "borderTop": "1px solid var(--fmed-border)",
    "padding": "16px",
    "background": "var(--fmed-surface-soft)",
    "color": "var(--fmed-text)",
    "WebkitTextFillColor": "var(--fmed-text)"
  },
  "exportInlineGrid": {
    "display": "grid",
    "gridTemplateColumns": "repeat(auto-fit, minmax(210px, 1fr))",
    "gap": "10px",
    "alignItems": "stretch"
  },
  "exportInlineGridSmall": {
    "display": "grid",
    "gridTemplateColumns": "minmax(220px, 320px)",
    "gap": "12px",
    "marginBottom": "12px"
  },
  "exportInfoLine": {
    "marginTop": "12px",
    "color": "var(--fmed-muted)",
    "fontSize": "12px",
    "fontWeight": 400
  },
  "exportActionRow": {
    "display": "flex",
    "gap": "10px",
    "marginTop": 12,
    "alignItems": "stretch",
    "flexWrap": "wrap"
  },
  "exportFilterBox": {
    "marginTop": "12px",
    "border": "1px solid var(--fmed-border)",
    "borderRadius": "14px",
    "background": "var(--fmed-surface-soft)",
    "padding": "12px"
  },
  "exportCheckboxGrid": {
    "display": "grid",
    "gridTemplateColumns": "repeat(2, minmax(0, 1fr))",
    "gap": "7px 10px",
    "maxHeight": "116px",
    "overflowY": "auto",
    "paddingRight": "4px"
  },
  "exportCheckLabel": {
    "display": "flex",
    "alignItems": "center",
    "gap": "7px",
    "fontSize": "11px",
    "fontWeight": 400,
    "color": "var(--fmed-text)",
    "background": "var(--fmed-surface-solid)",
    "border": "1px solid #e1ebf7",
    "borderRadius": "10px",
    "padding": "7px 8px",
    "cursor": "pointer"
  },
  "miniActionBtn": {
    "height": "26px",
    "borderRadius": 12,
    "border": "1px solid var(--fmed-border)",
    "background": "var(--fmed-surface)",
    "color": "var(--fmed-text)",
    "fontSize": "12px",
    "fontWeight": 800,
    "cursor": "pointer",
    "padding": "8px 11px",
    "minHeight": 36,
    "letterSpacing": ".05em",
    "whiteSpace": "normal",
    "WebkitTextFillColor": "var(--fmed-text)"
  },
  "editInput": {
    "width": "100%",
    "minHeight": 44,
    "borderRadius": 14,
    "border": "1px solid var(--fmed-border)",
    "padding": "10px 12px",
    "fontFamily": "\"Futura Light\", \"Futura PT\", Futura, \"Trebuchet MS\", Arial, sans-serif",
    "fontWeight": 700,
    "color": "var(--fmed-text)",
    "boxSizing": "border-box",
    "background": "var(--fmed-surface-solid)",
    "fontSize": 15,
    "boxShadow": "none"
  },
  "editTextarea": {
    "width": "100%",
    "minHeight": 96,
    "borderRadius": 14,
    "border": "1px solid var(--fmed-border)",
    "padding": "10px 12px",
    "fontFamily": "\"Futura Light\", \"Futura PT\", Futura, \"Trebuchet MS\", Arial, sans-serif",
    "fontWeight": 700,
    "color": "var(--fmed-text)",
    "boxSizing": "border-box",
    "background": "var(--fmed-surface-solid)",
    "fontSize": 15,
    "lineHeight": "18px",
    "boxShadow": "none"
  },
  "editActions": {
    "display": "grid",
    "gridTemplateColumns": "1fr 1fr",
    "gap": "10px",
    "marginTop": "24px",
    "flexWrap": "wrap"
  },
  "sidebarBottomPanel": {
    "flex": "0 0 auto",
    "display": "flex",
    "flexDirection": "column",
    "gap": "7px",
    "paddingTop": "14px",
    "borderTop": "1px solid rgba(31,174,156,.12)",
    "flexShrink": 0,
    "background": "rgba(255,255,255,.09)",
    "border": "1px solid rgba(255,255,255,.12)",
    "color": "var(--fmed-sidebar-text)"
  },
  "sidebarUserCard": {
    "display": "flex",
    "alignItems": "center",
    "gap": "10px",
    "padding": "12px",
    "borderRadius": 18,
    "background": "rgba(255,255,255,.10)",
    "border": "1px solid rgba(255,255,255,.14)",
    "color": "#FFFFFF",
    "backdropFilter": "blur(8px)",
    "minHeight": "66px",
    "boxShadow": "var(--fmed-card-shadow-soft)"
  },
  "sidebarUserAvatar": {
    "width": "34px",
    "height": "34px",
    "borderRadius": "12px",
    "display": "flex",
    "alignItems": "center",
    "justifyContent": "center",
    "background": "rgba(255,255,255,.18)",
    "color": "#FFFFFF",
    "fontSize": "14px",
    "fontWeight": 500,
    "flex": "0 0 auto",
    "minWidth": "34px"
  },
  "sidebarUserInfo": {
    "minWidth": 0,
    "flex": 1
  },
  "sidebarUserName": {
    "color": "#FFFFFF",
    "fontSize": "12px",
    "lineHeight": "15px",
    "letterSpacing": "0.04em",
    "whiteSpace": "nowrap",
    "overflow": "hidden",
    "textOverflow": "ellipsis",
    "fontWeight": 500
  },
  "sidebarUserRole": {
    "color": "rgba(255,255,255,.70)",
    "fontSize": "9px",
    "lineHeight": "12px",
    "letterSpacing": ".06em",
    "textTransform": "uppercase",
    "whiteSpace": "nowrap",
    "overflow": "hidden",
    "textOverflow": "ellipsis",
    "opacity": 0.72
  },
  "sidebarRoleHint": {
    "marginTop": 10,
    "padding": "0 8px",
    "borderRadius": "10px",
    "background": "rgba(255,255,255,.07)",
    "border": "1px solid rgba(255,255,255,.13)",
    "color": "rgba(255,255,255,0.72)",
    "fontSize": "9px",
    "letterSpacing": ".06em",
    "textTransform": "uppercase",
    "lineHeight": "12px",
    "textAlign": "center",
    "minHeight": "28px",
    "fontWeight": 500,
    "height": "28px",
    "display": "none"
  },
  "sidebarLogoutBtn": {
    "width": "100%",
    "height": "42px",
    "borderRadius": "12px",
    "border": "1px solid rgba(255,255,255,.24)",
    "background": "rgba(255,255,255,.10)",
    "color": "#FFFFFF",
    "fontSize": "12px",
    "fontWeight": 500,
    "cursor": "pointer",
    "display": "flex",
    "alignItems": "center",
    "justifyContent": "center",
    "gap": "8px",
    "backdropFilter": "blur(8px)",
    "minHeight": "40px",
    "letterSpacing": ".05em"
  },
  "themeToggleBtn": {
    "width": "100%",
    "height": "44px",
    "borderRadius": "12px",
    "border": "1px solid rgba(255,255,255,.30)",
    "background": "rgba(255,255,255,.12)",
    "color": "#FFFFFF",
    "fontSize": "12px",
    "fontWeight": 500,
    "cursor": "pointer",
    "display": "flex",
    "alignItems": "center",
    "justifyContent": "center",
    "gap": "8px",
    "backdropFilter": "blur(8px)",
    "boxShadow": "0 14px 28px rgba(0,0,0,.18)",
    "bottom": "14px",
    "minHeight": "40px",
    "letterSpacing": ".05em"
  },
  "assetHeroEyebrow": {
    "color": "#1FAE9C",
    "fontSize": 12,
    "fontWeight": 500,
    "letterSpacing": ".14em",
    "textTransform": "uppercase",
    "marginBottom": "8px",
    "display": "inline-flex",
    "alignItems": "center",
    "width": "fit-content",
    "padding": "7px 11px",
    "borderRadius": 999,
    "background": "color-mix(in srgb, var(--fmed-primary) 12%, transparent)",
    "border": "1px solid color-mix(in srgb, var(--fmed-primary) 20%, transparent)",
    "gap": 8,
    "lineHeight": "16px",
    "WebkitTextFillColor": "#1FAE9C"
  },
  "assetHeroRight": {
    "minWidth": 210,
    "borderRadius": 24,
    "background": "linear-gradient(135deg,#1FAE9C 0%,#147C72 100%)",
    "color": "#FFFFFF",
    "padding": "18px 20px",
    "display": "flex",
    "flexDirection": "column",
    "justifyContent": "center",
    "alignItems": "flex-start",
    "boxShadow": "0 18px 38px rgba(31,174,156,.22)",
    "gap": "12px",
    "minHeight": 136,
    "border": "1px solid rgba(255,255,255,.16)"
  },
  "assetHeroBadgeNumber": {
    "fontSize": 38,
    "lineHeight": "40px",
    "fontWeight": 500,
    "color": "#FFFFFF",
    "letterSpacing": "-.06em",
    "WebkitTextFillColor": "#FFFFFF"
  },
  "assetHeroBadgeText": {
    "marginTop": 10,
    "fontSize": 14,
    "fontWeight": 500,
    "minWidth": 0,
    "padding": 0,
    "borderRadius": 18,
    "background": "transparent",
    "border": 0,
    "color": "#FFFFFF",
    "boxShadow": "none",
    "letterSpacing": ".10em",
    "textTransform": "uppercase",
    "minHeight": 92,
    "WebkitTextFillColor": "#FFFFFF"
  },
  "assetHeroBadgeSub": {
    "marginTop": 3,
    "fontSize": 12,
    "fontWeight": 850,
    "opacity": 0.86,
    "color": "rgba(255,255,255,.78)",
    "letterSpacing": ".08em",
    "textTransform": "uppercase",
    "WebkitTextFillColor": "rgba(255,255,255,.78)"
  },
  "assetFiltersPanel": {
    "padding": 18,
    "borderRadius": 26,
    "background": "var(--fmed-d3-card)",
    "border": "1px solid var(--fmed-d3-border)",
    "boxShadow": "var(--fmed-d3-shadow-soft)",
    "marginBottom": "16px",
    "overflow": "hidden",
    "boxSizing": "border-box",
    "marginTop": 18,
    "color": "var(--fmed-d3-text)",
    "width": "100%",
    "maxWidth": "100%",
    "margin": "0 0 18px"
  },
  "assetFiltersHeader": {
    "display": "flex",
    "justifyContent": "space-between",
    "alignItems": "flex-start",
    "gap": 16,
    "marginBottom": 14,
    "color": "var(--fmed-text)",
    "flexWrap": "wrap"
  },
  "assetSectionTitle": {
    "margin": 0,
    "color": "var(--fmed-text)",
    "fontSize": 22,
    "lineHeight": 1.1,
    "fontWeight": 950,
    "overflowWrap": "anywhere",
    "letterSpacing": "-.035em"
  },
  "assetSectionSubtitle": {
    "margin": "6px 0 0",
    "color": "var(--fmed-muted)",
    "fontSize": 13,
    "lineHeight": 1.45,
    "fontWeight": 650,
    "maxWidth": "100%",
    "overflowWrap": "anywhere",
    "whiteSpace": "normal"
  },
  "assetFilterChips": {
    "display": "flex",
    "gap": 8,
    "flexWrap": "wrap",
    "justifyContent": "flex-end",
    "alignItems": "center",
    "maxWidth": "460px",
    "marginTop": "14px"
  },
  "assetChip": {
    "padding": "6px 10px",
    "borderRadius": 999,
    "background": "var(--fmed-surface-solid)",
    "border": "1px solid var(--fmed-border)",
    "color": "var(--fmed-text)",
    "fontSize": 12,
    "fontWeight": 900,
    "whiteSpace": "nowrap",
    "minHeight": 30,
    "display": "inline-flex",
    "alignItems": "center",
    "boxShadow": "0 8px 20px rgba(8,32,51,.05)"
  },
  "assetFiltersGrid": {
    "display": "grid",
    "gridTemplateColumns": "repeat(auto-fit, minmax(180px, 1fr))",
    "gap": 12,
    "alignItems": "end"
  },
  "assetInputLarge": {
    "height": "56px",
    "padding": "0 14px",
    "borderRadius": 16,
    "border": "1px solid var(--fmed-d3-border)",
    "background": "var(--fmed-d3-soft)",
    "color": "var(--fmed-d3-text)",
    "fontSize": 14,
    "fontWeight": 760,
    "outline": "none",
    "boxShadow": "none",
    "minHeight": 46,
    "WebkitTextFillColor": "var(--fmed-d3-text)",
    "gridColumn": "span 2",
    "width": "100%"
  },
  "assetSelectLarge": {
    "height": "56px",
    "padding": "0 12px",
    "borderRadius": 16,
    "border": "1px solid var(--fmed-d3-border)",
    "background": "var(--fmed-d3-soft)",
    "color": "var(--fmed-d3-text)",
    "fontSize": 13,
    "fontWeight": 820,
    "outline": "none",
    "minHeight": 46,
    "boxShadow": "none",
    "WebkitTextFillColor": "var(--fmed-d3-text)",
    "width": "100%"
  },
  "assetKpiTop": {
    "display": "flex",
    "alignItems": "center",
    "gap": 12,
    "justifyContent": "space-between",
    "color": "var(--fmed-muted)",
    "fontSize": 12,
    "fontWeight": 950,
    "textTransform": "uppercase",
    "letterSpacing": ".08em"
  },
  "assetKpiIcon": {
    "fontSize": 22,
    "width": 46,
    "height": 46,
    "minWidth": 46,
    "borderRadius": 16,
    "display": "inline-flex",
    "alignItems": "center",
    "justifyContent": "center",
    "color": "#1FAE9C",
    "background": "rgba(31,174,156,.12)",
    "border": "1px solid rgba(31,174,156,.22)",
    "boxShadow": "none"
  },
  "assetPrimaryAction": {
    "height": "50px",
    "borderRadius": 15,
    "border": "1px solid rgba(255,255,255,.14)",
    "background": "linear-gradient(135deg,#1FAE9C 0%,#147C72 100%)",
    "color": "#FFFFFF",
    "fontSize": "13px",
    "fontWeight": 950,
    "cursor": "pointer",
    "boxShadow": "0 14px 30px rgba(31,174,156,.20)",
    "minHeight": 44,
    "minWidth": "0",
    "padding": "0 16px",
    "lineHeight": "17px",
    "letterSpacing": ".01em",
    "textTransform": "uppercase",
    "fontStyle": "normal",
    "whiteSpace": "nowrap",
    "overflow": "hidden",
    "boxSizing": "border-box",
    "maxWidth": "100%",
    "textOverflow": "clip",
    "flex": "0 1 auto",
    "WebkitTextFillColor": "#FFFFFF"
  },
  "assetSecondaryAction": {
    "height": "50px",
    "borderRadius": 15,
    "border": "1px solid var(--fmed-d3-border)",
    "background": "var(--fmed-d3-soft)",
    "color": "var(--fmed-d3-text)",
    "fontSize": "13px",
    "fontWeight": 950,
    "cursor": "pointer",
    "boxShadow": "none",
    "minHeight": 44,
    "minWidth": "0",
    "padding": "0 16px",
    "lineHeight": "17px",
    "letterSpacing": ".05em",
    "textTransform": "uppercase",
    "fontStyle": "normal",
    "whiteSpace": "nowrap",
    "overflow": "hidden",
    "boxSizing": "border-box",
    "maxWidth": "100%",
    "textOverflow": "clip",
    "flex": "0 1 auto",
    "WebkitTextFillColor": "var(--fmed-d3-text)"
  },
  "assetGhostAction": {
    "height": "50px",
    "borderRadius": 15,
    "border": "1px solid rgba(31,174,156,.24)",
    "background": "transparent",
    "color": "#1FAE9C",
    "fontSize": "13px",
    "fontWeight": 900,
    "cursor": "pointer",
    "boxShadow": "none",
    "minHeight": 44,
    "minWidth": "0",
    "padding": "0 14px",
    "lineHeight": "17px",
    "letterSpacing": ".05em",
    "textTransform": "uppercase",
    "fontStyle": "normal",
    "whiteSpace": "nowrap",
    "overflow": "hidden",
    "boxSizing": "border-box",
    "maxWidth": "100%",
    "textOverflow": "clip",
    "flex": "0 1 auto",
    "WebkitTextFillColor": "#1FAE9C"
  },
  "assetAnalysisCard": {
    "background": "var(--fmed-card-gradient)",
    "border": "1px solid var(--fmed-border)",
    "borderRadius": 22,
    "padding": 16,
    "boxShadow": "var(--fmed-card-shadow-soft)",
    "overflow": "hidden"
  },
  "assetAnalysisTitle": {
    "margin": "0 0 12px",
    "color": "var(--fmed-text)",
    "fontSize": 16,
    "fontWeight": 950
  },
  "assetTableCard": {
    "background": "var(--fmed-d3-card)",
    "border": "1px solid var(--fmed-d3-border)",
    "borderRadius": 28,
    "padding": "20px",
    "boxShadow": "var(--fmed-d3-shadow-soft)",
    "marginTop": "18px",
    "color": "var(--fmed-d3-text)",
    "overflow": "hidden",
    "textTransform": "uppercase"
  },
  "assetTableTitle": {
    "margin": 0,
    "color": "var(--fmed-d3-title)",
    "fontSize": 21,
    "fontWeight": 500,
    "lineHeight": "24px",
    "letterSpacing": "-.02em",
    "WebkitTextFillColor": "var(--fmed-d3-title)"
  },
  "assetTableSubtitle": {
    "margin": "6px 0 0",
    "color": "var(--fmed-d3-muted)",
    "fontSize": 13,
    "fontWeight": 650,
    "lineHeight": 1.4,
    "WebkitTextFillColor": "var(--fmed-d3-muted)"
  },
  "assetCloseBtn": {
    "padding": "0 14px",
    "borderRadius": 14,
    "border": "1px solid var(--fmed-border)",
    "background": "var(--fmed-surface-solid)",
    "color": "var(--fmed-text)",
    "fontSize": "14px",
    "fontWeight": 900,
    "cursor": "pointer",
    "minHeight": 40
  },
  "assetSearchRow": {
    "display": "grid",
    "gridTemplateColumns": "minmax(0, 1fr) 156px",
    "gap": "14px",
    "alignItems": "center",
    "width": "100%",
    "maxWidth": "100%",
    "marginTop": "14px",
    "boxSizing": "border-box"
  },
  "assetInputWide": {
    "width": "100%",
    "maxWidth": "100%",
    "minWidth": 0,
    "minHeight": 46,
    "borderRadius": 16,
    "border": "1px solid var(--fmed-d3-border)",
    "background": "var(--fmed-d3-soft)",
    "color": "var(--fmed-d3-text)",
    "padding": "0 14px",
    "fontSize": "17px",
    "lineHeight": "24px",
    "fontWeight": 400,
    "outline": "none",
    "boxSizing": "border-box",
    "whiteSpace": "nowrap",
    "overflow": "hidden",
    "textOverflow": "ellipsis",
    "boxShadow": "none",
    "WebkitTextFillColor": "var(--fmed-d3-text)"
  },
  "assetSearchButton": {
    "minHeight": "48px",
    "minWidth": "156px",
    "maxWidth": "156px",
    "borderRadius": "14px",
    "border": "1px solid rgba(31,174,156,.50)",
    "background": "linear-gradient(135deg, #1FAE9C, #1FAE9C)",
    "color": "#02131D",
    "padding": "0 18px",
    "fontSize": "16px",
    "lineHeight": "20px",
    "fontWeight": 850,
    "letterSpacing": "0.035em",
    "textTransform": "uppercase",
    "cursor": "pointer",
    "display": "inline-flex",
    "alignItems": "center",
    "justifyContent": "center",
    "gap": "9px",
    "boxSizing": "border-box",
    "whiteSpace": "nowrap",
    "overflow": "visible",
    "boxShadow": "0 8px 16px rgba(42,32,18,.07)"
  },
  "button": {
    "minHeight": "44px",
    "padding": "0 12px",
    "fontSize": "13px",
    "lineHeight": "16px",
    "fontWeight": 500,
    "letterSpacing": ".05em",
    "textTransform": "uppercase",
    "fontStyle": "normal",
    "whiteSpace": "normal",
    "boxSizing": "border-box",
    "minWidth": "0",
    "maxWidth": "100%",
    "borderRadius": "12px",
    "overflow": "hidden",
    "textOverflow": "clip",
    "boxShadow": "none"
  },
  "primaryButton": {
    "minHeight": "44px",
    "padding": "0 12px",
    "fontSize": "13px",
    "lineHeight": "16px",
    "fontWeight": 500,
    "letterSpacing": ".05em",
    "textTransform": "uppercase",
    "fontStyle": "normal",
    "whiteSpace": "normal",
    "boxSizing": "border-box",
    "minWidth": "0",
    "maxWidth": "100%",
    "borderRadius": "12px",
    "overflow": "hidden",
    "textOverflow": "clip",
    "boxShadow": "none"
  },
  "secondaryButton": {
    "minHeight": "44px",
    "padding": "0 12px",
    "fontSize": "13px",
    "lineHeight": "16px",
    "fontWeight": 500,
    "letterSpacing": ".05em",
    "textTransform": "uppercase",
    "fontStyle": "normal",
    "whiteSpace": "normal",
    "boxSizing": "border-box",
    "minWidth": "0",
    "maxWidth": "100%",
    "borderRadius": "12px",
    "overflow": "hidden",
    "textOverflow": "clip",
    "boxShadow": "none"
  },
  "modalBody": {
    "overflowX": "hidden",
    "boxSizing": "border-box"
  },
  "sidebarDivider": {
    "margin": "10px 0",
    "opacity": 0.28,
    "borderColor": "rgba(255,255,255,.16)"
  },
  "sidebarActionRow": {
    "display": "grid",
    "gridTemplateColumns": "1fr",
    "gap": "7px",
    "width": "100%"
  },
  "sidebarThemeSmallBtn": {
    "minHeight": "34px",
    "height": "34px",
    "padding": "0 8px",
    "borderRadius": "10px",
    "border": "1px solid rgba(255,255,255,.15)",
    "background": "rgba(255,255,255,.07)",
    "color": "#FFFFFF",
    "cursor": "pointer",
    "display": "inline-flex",
    "alignItems": "center",
    "justifyContent": "center",
    "gap": "6px",
    "fontSize": "10px",
    "lineHeight": "12px",
    "fontWeight": 500,
    "letterSpacing": ".04em",
    "textTransform": "uppercase",
    "boxShadow": "none"
  },
  "sidebarLogoutSmallBtn": {
    "minHeight": "44px",
    "height": "34px",
    "padding": "0 8px",
    "borderRadius": "13px",
    "border": "1px solid var(--fmed-border)",
    "background": "var(--fmed-surface)",
    "color": "var(--fmed-text)",
    "cursor": "pointer",
    "display": "inline-flex",
    "alignItems": "center",
    "justifyContent": "center",
    "gap": "6px",
    "fontSize": "10px",
    "lineHeight": "12px",
    "fontWeight": 500,
    "letterSpacing": ".04em",
    "textTransform": "uppercase",
    "boxShadow": "none",
    "width": "100%",
    "WebkitTextFillColor": "var(--fmed-text)"
  },
  "filterPanel": {
    "background": "linear-gradient(180deg,#FCFAF5,#F8F4EC)",
    "border": "1px solid #E4DDD0"
  },
  "fmedPremiumHero": {
    "display": "grid",
    "gridTemplateColumns": "170px minmax(0, 1fr) 310px",
    "gap": "30px",
    "alignItems": "center",
    "borderRadius": "18px",
    "padding": "28px 38px",
    "background": "var(--fmed-hero-bg)",
    "border": "1px solid var(--fmed-hero-border)",
    "boxShadow": "0 18px 42px rgba(66,45,18,.10)",
    "marginBottom": "18px",
    "minHeight": "230px",
    "color": "var(--fmed-text)"
  },
  "fmedPremiumHeroMark": {
    "width": "145px",
    "height": "145px",
    "display": "flex",
    "alignItems": "center",
    "justifyContent": "center",
    "color": "var(--fmed-accent)",
    "fontSize": "118px",
    "lineHeight": 1,
    "fontWeight": 900,
    "transform": "rotate(180deg)",
    "textShadow": "0 10px 22px rgba(0,0,0,.12)"
  },
  "fmedPremiumHeroMain": {
    "minWidth": 0
  },
  "fmedPremiumHeroTitle": {
    "color": "var(--fmed-text)",
    "fontSize": "62px",
    "lineHeight": "66px",
    "fontWeight": 800,
    "letterSpacing": "0.055em"
  },
  "fmedPremiumHeroSubTitle": {
    "color": "var(--fmed-accent)",
    "fontSize": "23px",
    "lineHeight": "30px",
    "fontWeight": 700,
    "letterSpacing": "0.26em",
    "marginTop": "12px"
  },
  "fmedPremiumHeroText": {
    "color": "var(--fmed-text)",
    "fontSize": "16px",
    "lineHeight": 1.55,
    "maxWidth": "660px",
    "margin": "20px 0 0"
  },
  "fmedPremiumTrustColumn": {
    "borderLeft": "1px solid var(--fmed-trust-border)",
    "paddingLeft": "24px",
    "display": "grid",
    "gap": "17px"
  },
  "fmedPremiumTrustItem": {
    "display": "grid",
    "gridTemplateColumns": "50px minmax(0, 1fr)",
    "columnGap": "14px",
    "alignItems": "center",
    "color": "var(--fmed-text)",
    "gap": "13px"
  },
  "fmedPremiumKpiGrid": {
    "display": "grid",
    "gridTemplateColumns": "repeat(5, minmax(180px, 1fr))",
    "gap": "14px",
    "marginBottom": "18px"
  },
  "fmedPremiumKpiCard": {
    "textAlign": "left",
    "minHeight": "118px",
    "padding": "18px",
    "borderRadius": "14px",
    "border": "1px solid var(--fmed-border)",
    "borderBottom": "3px solid #165A52",
    "background": "var(--fmed-card-gradient)",
    "boxShadow": "0 14px 30px rgba(66,45,18,.08)",
    "cursor": "pointer",
    "color": "var(--fmed-text)"
  },
  "fmedPremiumKpiIcon": {
    "width": "58px",
    "height": "58px",
    "borderRadius": "14px",
    "display": "inline-flex",
    "alignItems": "center",
    "justifyContent": "center",
    "fontSize": "28px",
    "fontWeight": 900,
    "float": "left",
    "marginRight": "14px"
  },
  "fmedPremiumKpiLabel": {
    "display": "block",
    "color": "var(--fmed-text)",
    "textTransform": "uppercase",
    "fontSize": "12px",
    "fontWeight": 800,
    "marginTop": "4px",
    "lineHeight": "16px"
  },
  "fmedPremiumKpiValue": {
    "display": "block",
    "color": "var(--fmed-text)",
    "fontSize": "31px",
    "lineHeight": 1.1,
    "fontWeight": 800,
    "marginTop": "6px"
  },
  "fmedPremiumKpiSmall": {
    "display": "block",
    "clear": "both",
    "color": "var(--fmed-muted)",
    "fontSize": "13px",
    "marginTop": "12px"
  },
  "fmedPremiumActionGrid": {
    "display": "grid",
    "gridTemplateColumns": "repeat(6, minmax(150px, 1fr))",
    "gap": "14px",
    "marginBottom": "22px"
  },
  "fmedPremiumActionBtn": {
    "minHeight": "70px",
    "padding": "16px 18px",
    "borderRadius": "14px",
    "color": "#fff",
    "border": "0",
    "display": "flex",
    "alignItems": "center",
    "justifyContent": "center",
    "gap": "12px",
    "boxShadow": "0 14px 30px rgba(6,43,69,.18)",
    "cursor": "pointer",
    "fontSize": "14px",
    "fontWeight": 800,
    "letterSpacing": "0.035em"
  },
  "fmedPremiumPanelGrid": {
    "display": "grid",
    "gridTemplateColumns": "1fr 1fr 1.15fr",
    "gap": "16px"
  },
  "fmedPremiumPanel": {
    "minHeight": "250px",
    "borderRadius": "14px",
    "padding": "20px",
    "background": "var(--fmed-panel-gradient)",
    "border": "1px solid var(--fmed-border)",
    "boxShadow": "0 14px 34px rgba(66,45,18,.08)",
    "color": "var(--fmed-text)"
  },
  "fmedPremiumPanelTitle": {
    "fontSize": "15px",
    "fontWeight": 800,
    "marginBottom": "16px",
    "color": "var(--fmed-text)"
  },
  "fmedPremiumDonut": {
    "width": "148px",
    "height": "148px",
    "borderRadius": "50%",
    "background": "conic-gradient(#165A52 0 42%, #F3B51B 42% 68%, #6B4BB5 68% 82%, #58A867 82% 100%)",
    "color": "var(--fmed-text)",
    "display": "flex",
    "alignItems": "center",
    "justifyContent": "center",
    "textAlign": "center",
    "margin": "12px auto 18px",
    "boxShadow": "inset 0 0 0 42px var(--fmed-surface-solid)"
  },
  "fmedPremiumLegend": {
    "display": "flex",
    "alignItems": "center",
    "gap": "10px",
    "color": "var(--fmed-text)",
    "fontSize": "13px",
    "margin": "8px 0"
  },
  "fmedPremiumBars": {
    "height": "190px",
    "display": "grid",
    "gridTemplateColumns": "repeat(4,1fr)",
    "alignItems": "end",
    "gap": "16px",
    "paddingTop": "22px"
  },
  "fmedPremiumRecentRow": {
    "width": "100%",
    "display": "grid",
    "gridTemplateColumns": "42px 1fr auto",
    "alignItems": "center",
    "gap": "12px",
    "border": "0",
    "background": "transparent",
    "color": "var(--fmed-text)",
    "padding": "10px 0",
    "textAlign": "left",
    "cursor": "pointer"
  },
  "fmedPremiumTrustIcon": {
    "width": "48px",
    "height": "48px",
    "borderRadius": "999px",
    "display": "inline-flex",
    "alignItems": "center",
    "justifyContent": "center",
    "background": "#073657",
    "border": "1px solid rgba(242,184,75,.60)",
    "color": "#F2B84B",
    "fontSize": "23px",
    "fontWeight": 800
  },
  "fmedPremiumTrustTitle": {
    "display": "block",
    "color": "var(--fmed-text)",
    "fontSize": "15px",
    "lineHeight": "20px",
    "fontWeight": 800,
    "letterSpacing": "0.02em"
  },
  "fmedPremiumTrustSmall": {
    "display": "block",
    "color": "var(--fmed-muted)",
    "fontSize": "13px",
    "lineHeight": "18px",
    "marginTop": "3px",
    "fontWeight": 500
  },
  "fmedDashboardHero": {
    "position": "relative",
    "overflow": "hidden",
    "display": "grid",
    "gridTemplateColumns": "minmax(0, 1fr) 340px",
    "gap": "28px",
    "alignItems": "stretch",
    "minHeight": "255px",
    "padding": "34px",
    "marginBottom": "18px",
    "borderRadius": "30px",
    "background": "linear-gradient(135deg, rgba(255,253,248,.98) 0%, rgba(249,238,218,.98) 52%, rgba(225,238,232,.95) 100%)",
    "border": "1px solid rgba(195,159,104,.42)",
    "boxShadow": "0 28px 70px rgba(38,56,73,.14)",
    "color": "#092A43"
  },
  "fmedDashboardHeroGlow": {
    "position": "absolute",
    "inset": "auto -80px -130px auto",
    "width": "340px",
    "height": "340px",
    "borderRadius": "999px",
    "background": "radial-gradient(circle, rgba(31,94,122,.22) 0%, rgba(47,125,107,.14) 42%, transparent 72%)",
    "pointerEvents": "none"
  },
  "fmedDashboardHeroContent": {
    "position": "relative",
    "zIndex": 1,
    "display": "flex",
    "flexDirection": "column",
    "justifyContent": "center",
    "minWidth": 0
  },
  "fmedDashboardEyebrow": {
    "display": "inline-flex",
    "width": "fit-content",
    "padding": "8px 12px",
    "borderRadius": "999px",
    "background": "rgba(31,94,122,.10)",
    "border": "1px solid rgba(31,94,122,.18)",
    "color": "#1F5E7A",
    "fontSize": "13px",
    "fontWeight": 700,
    "letterSpacing": "0.08em",
    "textTransform": "uppercase",
    "marginBottom": "16px"
  },
  "fmedDashboardTitle": {
    "margin": 0,
    "color": "#092A43",
    "fontSize": "56px",
    "lineHeight": "60px",
    "fontWeight": 800,
    "letterSpacing": "-0.045em"
  },
  "fmedDashboardSubtitle": {
    "margin": "16px 0 0",
    "maxWidth": "760px",
    "color": "#536575",
    "fontSize": "17px",
    "lineHeight": 1.55,
    "fontWeight": 450
  },
  "fmedDashboardHeroActions": {
    "display": "flex",
    "flexWrap": "wrap",
    "gap": "12px",
    "marginTop": "26px"
  },
  "fmedDashboardPrimaryBtn": {
    "minHeight": "50px",
    "padding": "0 20px",
    "borderRadius": "16px",
    "border": "0",
    "background": "linear-gradient(135deg,#073657,#1F5E7A)",
    "color": "#FFFFFF",
    "boxShadow": "0 16px 34px rgba(7,54,87,.24)",
    "cursor": "pointer"
  },
  "fmedDashboardSecondaryBtn": {
    "minHeight": "50px",
    "padding": "0 20px",
    "borderRadius": "16px",
    "border": "0",
    "background": "linear-gradient(135deg,#2F7D6B,#68A58F)",
    "color": "#FFFFFF",
    "boxShadow": "0 16px 34px rgba(47,125,107,.20)",
    "cursor": "pointer"
  },
  "fmedDashboardGhostBtn": {
    "minHeight": "50px",
    "padding": "0 20px",
    "borderRadius": "16px",
    "border": "1px solid rgba(31,94,122,.22)",
    "background": "rgba(255,255,255,.56)",
    "color": "#1F5E7A",
    "cursor": "pointer"
  },
  "fmedDashboardStatusCard": {
    "position": "relative",
    "zIndex": 1,
    "padding": "24px",
    "borderRadius": "26px",
    "background": "linear-gradient(180deg, rgba(9,42,67,.96), rgba(31,94,122,.95))",
    "color": "#FFFFFF",
    "boxShadow": "0 24px 52px rgba(7,54,87,.24)",
    "display": "flex",
    "flexDirection": "column",
    "justifyContent": "center"
  },
  "fmedDashboardStatusTop": {
    "display": "flex",
    "alignItems": "center",
    "gap": "10px",
    "color": "rgba(255,255,255,.82)",
    "fontSize": "13px",
    "textTransform": "uppercase",
    "letterSpacing": ".08em"
  },
  "fmedDashboardStatusDot": {
    "width": "10px",
    "height": "10px",
    "borderRadius": "999px",
    "background": "#F2B84B",
    "boxShadow": "0 0 0 6px rgba(242,184,75,.16)"
  },
  "fmedDashboardStatusNumber": {
    "display": "block",
    "marginTop": "20px",
    "fontSize": "68px",
    "lineHeight": 1,
    "fontWeight": 800,
    "color": "#FFFFFF"
  },
  "fmedDashboardStatusLabel": {
    "display": "block",
    "marginTop": "8px",
    "color": "rgba(255,255,255,.80)",
    "fontSize": "15px"
  },
  "fmedDashboardStatusLine": {
    "height": "9px",
    "borderRadius": "999px",
    "background": "rgba(255,255,255,.14)",
    "overflow": "hidden",
    "marginTop": "22px"
  },
  "fmedDashboardStatusBtn": {
    "marginTop": "18px",
    "minHeight": "44px",
    "borderRadius": "14px",
    "border": "1px solid rgba(255,255,255,.18)",
    "background": "rgba(255,255,255,.12)",
    "color": "#FFFFFF",
    "cursor": "pointer"
  },
  "fmedDashboardKpiGrid": {
    "display": "grid",
    "gridTemplateColumns": "repeat(5, minmax(0, 1fr))",
    "gap": "14px",
    "marginBottom": "16px"
  },
  "fmedDashboardKpiCard": {
    "position": "relative",
    "overflow": "hidden",
    "minHeight": "142px",
    "padding": "18px",
    "borderRadius": "24px",
    "border": "1px solid rgba(226,212,188,.78)",
    "background": "linear-gradient(180deg,#FFFDF8,#FBF4EA)",
    "color": "#092A43",
    "boxShadow": "0 18px 44px rgba(38,56,73,.10)",
    "textAlign": "left",
    "cursor": "pointer"
  },
  "fmedDashboardKpiCardBlue": {
    "borderTop": "5px solid #1F5E7A"
  },
  "fmedDashboardKpiCardGreen": {
    "borderTop": "5px solid #2F7D6B"
  },
  "fmedDashboardKpiCardAmber": {
    "borderTop": "5px solid #C8942F"
  },
  "fmedDashboardKpiCardPetrol": {
    "borderTop": "5px solid #0F6B73"
  },
  "fmedDashboardKpiCardViolet": {
    "borderTop": "5px solid #7C6A45"
  },
  "fmedDashboardKpiIcon": {
    "width": "46px",
    "height": "46px",
    "borderRadius": "16px",
    "display": "inline-flex",
    "alignItems": "center",
    "justifyContent": "center",
    "background": "rgba(31,94,122,.10)",
    "color": "#1F5E7A",
    "fontSize": "24px",
    "fontWeight": 800,
    "marginBottom": "14px"
  },
  "fmedDashboardKpiLabel": {
    "display": "block",
    "color": "#586979",
    "fontSize": "12px",
    "lineHeight": "16px",
    "fontWeight": 750,
    "letterSpacing": ".07em",
    "textTransform": "uppercase"
  },
  "fmedDashboardKpiValue": {
    "display": "block",
    "color": "#092A43",
    "fontSize": "36px",
    "lineHeight": "40px",
    "fontWeight": 850,
    "marginTop": "5px"
  },
  "fmedDashboardKpiHint": {
    "display": "block",
    "color": "#667687",
    "fontSize": "13px",
    "marginTop": "8px"
  },
  "fmedDashboardActionStrip": {
    "display": "grid",
    "gridTemplateColumns": "repeat(4, minmax(0,1fr))",
    "gap": "12px",
    "marginBottom": "16px"
  },
  "fmedDashboardQuickAction": {
    "minHeight": "72px",
    "padding": "14px 18px",
    "borderRadius": "20px",
    "border": "1px solid rgba(31,94,122,.16)",
    "background": "rgba(255,253,248,.72)",
    "color": "#092A43",
    "display": "flex",
    "flexDirection": "column",
    "alignItems": "flex-start",
    "justifyContent": "center",
    "cursor": "pointer",
    "boxShadow": "0 14px 34px rgba(38,56,73,.08)"
  },
  "fmedDashboardPanelGrid": {
    "display": "grid",
    "gridTemplateColumns": "1.35fr .8fr 1fr",
    "gap": "16px"
  },
  "fmedDashboardPanelLarge": {
    "minHeight": "300px",
    "padding": "22px",
    "borderRadius": "26px",
    "background": "linear-gradient(180deg,#FFFDF8,#FBF4EA)",
    "border": "1px solid rgba(226,212,188,.80)",
    "boxShadow": "0 18px 44px rgba(38,56,73,.10)",
    "color": "#092A43"
  },
  "fmedDashboardPanel": {
    "minHeight": "300px",
    "padding": "22px",
    "borderRadius": "26px",
    "background": "linear-gradient(180deg,#FFFDF8,#FBF4EA)",
    "border": "1px solid rgba(226,212,188,.80)",
    "boxShadow": "0 18px 44px rgba(38,56,73,.10)",
    "color": "#092A43"
  },
  "fmedDashboardPanelHeader": {
    "display": "flex",
    "alignItems": "flex-start",
    "justifyContent": "space-between",
    "gap": "14px",
    "marginBottom": "16px"
  },
  "fmedDashboardPanelHeaderCompact": {
    "display": "flex",
    "alignItems": "center",
    "justifyContent": "space-between",
    "gap": "14px",
    "marginBottom": "18px"
  },
  "fmedDashboardPanelTitle": {
    "margin": 0,
    "color": "#092A43",
    "fontSize": "19px",
    "lineHeight": "24px",
    "fontWeight": 800
  },
  "fmedDashboardPanelSub": {
    "margin": "6px 0 0",
    "color": "#667687",
    "fontSize": "14px",
    "lineHeight": 1.45
  },
  "fmedDashboardMiniBtn": {
    "minHeight": "38px",
    "padding": "0 14px",
    "borderRadius": "13px",
    "border": "1px solid rgba(31,94,122,.18)",
    "background": "rgba(31,94,122,.08)",
    "color": "#1F5E7A",
    "cursor": "pointer"
  },
  "fmedDashboardVisualGrid": {
    "display": "grid",
    "gridTemplateColumns": "210px 1fr",
    "gap": "20px",
    "alignItems": "center"
  },
  "fmedDashboardDonutWrap": {
    "display": "flex",
    "alignItems": "center",
    "justifyContent": "center"
  },
  "fmedDashboardDonut": {
    "width": "178px",
    "height": "178px",
    "borderRadius": "999px",
    "background": "conic-gradient(#1F5E7A 0 36%, #2F7D6B 36% 60%, #C8942F 60% 80%, #7C6A45 80% 100%)",
    "boxShadow": "inset 0 0 0 48px #FFFDF8, 0 18px 38px rgba(38,56,73,.12)",
    "display": "flex",
    "flexDirection": "column",
    "alignItems": "center",
    "justifyContent": "center",
    "textAlign": "center",
    "color": "#092A43"
  },
  "fmedDashboardMetricList": {
    "display": "grid",
    "gap": "12px"
  },
  "fmedDashboardMetricRow": {
    "display": "grid",
    "gridTemplateColumns": "14px 1fr auto",
    "alignItems": "center",
    "gap": "10px",
    "padding": "12px 14px",
    "borderRadius": "16px",
    "background": "rgba(255,255,255,.52)",
    "color": "#33485B",
    "fontSize": "14px"
  },
  "fmedDashboardBars": {
    "height": "210px",
    "display": "grid",
    "gridTemplateColumns": "repeat(4,1fr)",
    "gap": "14px",
    "alignItems": "end",
    "paddingTop": "18px"
  },
  "fmedDashboardRecentList": {
    "display": "grid",
    "gap": "10px"
  },
  "fmedDashboardRecentRow": {
    "width": "100%",
    "display": "grid",
    "gridTemplateColumns": "42px 1fr",
    "gap": "12px",
    "alignItems": "center",
    "padding": "11px",
    "borderRadius": "16px",
    "border": "1px solid rgba(31,94,122,.10)",
    "background": "rgba(255,255,255,.48)",
    "color": "#092A43",
    "textAlign": "left",
    "cursor": "pointer"
  },
  "fmedDashboardRecentIcon": {
    "width": "38px",
    "height": "38px",
    "borderRadius": "14px",
    "display": "inline-flex",
    "alignItems": "center",
    "justifyContent": "center",
    "background": "rgba(47,125,107,.10)",
    "color": "#2F7D6B"
  },
  "fmedNeoHideHeader": {
    "display": "none"
  },
  "fmedNeoDashboardShell": {
    "margin": "0 auto",
    "padding": "4px 0 26px",
    "borderRadius": 0,
    "background": "transparent",
    "color": "var(--fmed-d3-text)",
    "minHeight": "calc(100vh - 24px)",
    "boxShadow": "none",
    "width": "100%",
    "maxWidth": "1720px",
    "overflowX": "hidden",
    "display": "flex",
    "flexDirection": "column",
    "gap": 18
  },
  "fmedNeoDashboardTopbar": {
    "display": "flex",
    "alignItems": "center",
    "justifyContent": "space-between",
    "gap": 18,
    "marginBottom": 16,
    "flexWrap": "wrap",
    "padding": "22px 24px",
    "borderRadius": 30,
    "background": "var(--fmed-d3-hero)",
    "border": "1px solid var(--fmed-d3-border)",
    "boxShadow": "var(--fmed-d3-shadow)",
    "overflow": "hidden",
    "color": "var(--fmed-d3-text)",
    "minHeight": 118,
    "position": "relative"
  },
  "fmedNeoTitleWrap": {
    "display": "flex",
    "alignItems": "center",
    "gap": 14,
    "minWidth": 0
  },
  "fmedNeoTitleIcon": {
    "width": 54,
    "height": 54,
    "borderRadius": 18,
    "display": "grid",
    "alignItems": "center",
    "justifyContent": "center",
    "color": "#FFFFFF",
    "background": "linear-gradient(135deg, #1FAE9C 0%, #147C72 100%)",
    "border": "1px solid rgba(255,255,255,.22)",
    "boxShadow": "0 16px 34px rgba(31,174,156,.24)",
    "minWidth": 54,
    "placeItems": "center"
  },
  "fmedNeoDashboardTitle": {
    "margin": 0,
    "color": "var(--fmed-d3-title)",
    "fontSize": "clamp(28px, 2.6vw, 42px)",
    "lineHeight": 1.02,
    "fontWeight": 500,
    "letterSpacing": "-.045em",
    "overflowWrap": "anywhere",
    "WebkitTextFillColor": "var(--fmed-d3-title)"
  },
  "fmedNeoDashboardSubtitle": {
    "margin": "6px 0 0",
    "color": "var(--fmed-d3-muted)",
    "fontSize": 14,
    "lineHeight": 1.48,
    "overflowWrap": "anywhere",
    "WebkitTextFillColor": "var(--fmed-d3-muted)",
    "fontWeight": 400,
    "maxWidth": 780
  },
  "fmedNeoTopActions": {
    "display": "flex",
    "alignItems": "center",
    "gap": 10,
    "justifyContent": "flex-end",
    "flexWrap": "wrap"
  },
  "fmedNeoDatePill": {
    "minHeight": 42,
    "padding": "10px 14px",
    "borderRadius": 999,
    "display": "inline-flex",
    "alignItems": "center",
    "gap": 8,
    "color": "var(--fmed-d3-text)",
    "background": "var(--fmed-d3-pill)",
    "border": "1px solid var(--fmed-d3-border)",
    "boxShadow": "none",
    "minWidth": 0,
    "whiteSpace": "nowrap",
    "WebkitTextFillColor": "var(--fmed-primary)",
    "justifyContent": "center",
    "fontSize": 13,
    "fontWeight": 500
  },
  "fmedNeoLivePill": {
    "minHeight": 42,
    "padding": "10px 14px",
    "borderRadius": 999,
    "display": "inline-flex",
    "alignItems": "center",
    "gap": 8,
    "color": "var(--fmed-d3-text)",
    "background": "rgba(31,174,156,.14)",
    "border": "1px solid rgba(31,174,156,.24)",
    "boxShadow": "none",
    "minWidth": 0,
    "whiteSpace": "nowrap",
    "WebkitTextFillColor": "var(--fmed-primary)",
    "justifyContent": "center",
    "fontSize": 13,
    "fontWeight": 500
  },
  "fmedNeoKpiGrid": {
    "display": "grid",
    "gridTemplateColumns": "repeat(5, minmax(0, 1fr))",
    "gap": 14,
    "marginBottom": 0,
    "alignItems": "stretch",
    "margin": "12px 0 18px"
  },
  "fmedNeoKpiCard": {
    "position": "relative",
    "overflow": "hidden",
    "minHeight": 136,
    "padding": "18px",
    "borderRadius": 26,
    "background": "var(--fmed-d3-card)",
    "border": "1px solid var(--fmed-d3-border)",
    "boxShadow": "var(--fmed-d3-shadow-soft)",
    "color": "var(--fmed-d3-text)",
    "display": "grid",
    "gridTemplateColumns": "54px minmax(0,1fr)",
    "gap": "12px 14px",
    "alignItems": "center",
    "textAlign": "left",
    "cursor": "pointer",
    "minWidth": 0,
    "height": "100%",
    "gridTemplateRows": "1fr auto",
    "boxSizing": "border-box",
    "WebkitTextFillColor": "var(--fmed-text)",
    "columnGap": 10,
    "rowGap": 3
  },
  "fmedNeoKpiCyan": {
    "boxShadow": "var(--fmed-d3-shadow-soft)",
    "borderTop": "4px solid #1FAE9C"
  },
  "fmedNeoKpiGreen": {
    "boxShadow": "var(--fmed-d3-shadow-soft)",
    "borderTop": "4px solid #39C97C"
  },
  "fmedNeoKpiAmber": {
    "boxShadow": "var(--fmed-d3-shadow-soft)",
    "borderTop": "4px solid #D89A2A"
  },
  "fmedNeoKpiBlue": {
    "boxShadow": "var(--fmed-d3-shadow-soft)",
    "borderTop": "4px solid #6DB193"
  },
  "fmedNeoKpiIcon": {
    "width": 54,
    "height": 54,
    "borderRadius": 18,
    "display": "grid",
    "alignItems": "center",
    "justifyContent": "center",
    "color": "#1FAE9C",
    "background": "rgba(31,174,156,.12)",
    "border": "1px solid rgba(31,174,156,.22)",
    "boxShadow": "none",
    "minWidth": 54,
    "gridRow": "1 / span 2",
    "placeItems": "center"
  },
  "fmedNeoKpiText": {
    "display": "flex",
    "flexDirection": "column",
    "minWidth": 0,
    "gap": 5,
    "overflowWrap": "anywhere",
    "overflow": "hidden"
  },
  "fmedNeoTrendPositive": {
    "gridColumn": "1 / -1",
    "color": "#1E9E66",
    "fontStyle": "normal",
    "fontWeight": 500,
    "fontSize": 12,
    "display": "block",
    "width": "100%",
    "minWidth": 0,
    "whiteSpace": "nowrap",
    "overflowWrap": "anywhere",
    "lineHeight": 1.15,
    "marginTop": "2px",
    "alignSelf": "start",
    "margin": 0,
    "padding": "7px 10px",
    "borderRadius": 999,
    "overflow": "hidden",
    "textOverflow": "ellipsis",
    "maxWidth": "100%",
    "background": "rgba(57,201,124,.12)",
    "WebkitTextFillColor": "var(--fmed-muted)",
    "border": "1px solid rgba(57,201,124,.22)",
    "boxShadow": "none",
    "letterSpacing": ".02em"
  },
  "fmedNeoTrendWarning": {
    "gridColumn": "1 / -1",
    "color": "#B77618",
    "fontStyle": "normal",
    "fontWeight": 500,
    "fontSize": 12,
    "display": "block",
    "width": "100%",
    "minWidth": 0,
    "whiteSpace": "nowrap",
    "overflowWrap": "anywhere",
    "lineHeight": 1.15,
    "marginTop": "2px",
    "alignSelf": "start",
    "margin": 0,
    "padding": "7px 10px",
    "borderRadius": 999,
    "overflow": "hidden",
    "textOverflow": "ellipsis",
    "maxWidth": "100%",
    "background": "rgba(216,154,42,.14)",
    "WebkitTextFillColor": "var(--fmed-muted)",
    "border": "1px solid rgba(216,154,42,.26)",
    "boxShadow": "none",
    "letterSpacing": ".02em"
  },
  "fmedNeoTrendBlue": {
    "gridColumn": "1 / -1",
    "color": "#147C72",
    "fontStyle": "normal",
    "fontWeight": 500,
    "fontSize": 12,
    "display": "block",
    "width": "100%",
    "minWidth": 0,
    "whiteSpace": "nowrap",
    "overflowWrap": "anywhere",
    "lineHeight": 1.15,
    "marginTop": "2px",
    "alignSelf": "start",
    "margin": 0,
    "padding": "7px 10px",
    "borderRadius": 999,
    "overflow": "hidden",
    "textOverflow": "ellipsis",
    "maxWidth": "100%",
    "background": "rgba(31,174,156,.12)",
    "WebkitTextFillColor": "var(--fmed-muted)",
    "border": "1px solid rgba(31,174,156,.23)",
    "boxShadow": "none",
    "letterSpacing": ".02em"
  },
  "fmedNeoMainGrid": {
    "display": "grid",
    "gridTemplateColumns": "minmax(0, 1.55fr) minmax(340px, .85fr)",
    "gap": 16,
    "marginBottom": 0,
    "alignItems": "stretch"
  },
  "fmedNeoChartCard": {
    "minHeight": "420px",
    "padding": "22px",
    "borderRadius": 22,
    "background": "var(--fmed-card-gradient)",
    "border": "1px solid var(--fmed-border)",
    "boxShadow": "var(--fmed-card-shadow)",
    "color": "var(--fmed-text)",
    "minWidth": 0,
    "overflow": "hidden"
  },
  "fmedNeoUrgentCard": {
    "minHeight": 380,
    "padding": 18,
    "borderRadius": 28,
    "background": "var(--fmed-d3-card)",
    "border": "1px solid var(--fmed-d3-border)",
    "boxShadow": "var(--fmed-d3-shadow-soft)",
    "color": "var(--fmed-d3-text)",
    "opacity": 0.96,
    "overflow": "hidden"
  },
  "fmedNeoPanelHeader": {
    "display": "flex",
    "alignItems": "center",
    "justifyContent": "space-between",
    "gap": 12,
    "marginBottom": 14
  },
  "fmedNeoPanelTitle": {
    "margin": 0,
    "color": "var(--fmed-d3-title)",
    "fontSize": 18,
    "lineHeight": "24px",
    "fontWeight": 500,
    "letterSpacing": "-.02em",
    "WebkitTextFillColor": "var(--fmed-d3-title)"
  },
  "fmedNeoPanelSub": {
    "margin": "4px 0 0",
    "color": "var(--fmed-d3-muted)",
    "fontSize": 13,
    "lineHeight": 1.4,
    "fontWeight": 400,
    "WebkitTextFillColor": "var(--fmed-d3-muted)"
  },
  "fmedNeoSmallBtn": {
    "minHeight": 38,
    "padding": "0 14px",
    "borderRadius": 14,
    "background": "var(--fmed-d3-soft)",
    "border": "1px solid var(--fmed-d3-border)",
    "color": "#147C72",
    "cursor": "pointer",
    "boxShadow": "none",
    "fontWeight": 500
  },
  "fmedNeoSmallBtnAccent": {
    "minHeight": 38,
    "padding": "0 14px",
    "borderRadius": 14,
    "background": "linear-gradient(135deg,#1FAE9C 0%,#147C72 100%)",
    "border": "1px solid rgba(255,255,255,.16)",
    "color": "#FFFFFF",
    "cursor": "pointer",
    "boxShadow": "0 12px 26px rgba(31,174,156,.22)",
    "whiteSpace": "nowrap",
    "fontWeight": 500
  },
  "fmedNeoLegend": {
    "display": "flex",
    "flexWrap": "wrap",
    "gap": "20px",
    "color": "var(--fmed-text)",
    "fontSize": "13px",
    "marginBottom": "12px"
  },
  "fmedNeoSvgChart": {
    "width": "100%",
    "height": "260px",
    "display": "block",
    "filter": "drop-shadow(0 10px 18px rgba(8,32,51,.08))"
  },
  "fmedNeoStatusGrid": {
    "display": "grid",
    "gridTemplateColumns": "repeat(4, minmax(0, 1fr))",
    "gap": "12px",
    "marginTop": "10px"
  },
  "fmedNeoStatusBox": {
    "minHeight": "72px",
    "padding": "12px",
    "borderRadius": "14px",
    "background": "var(--fmed-d3-soft)",
    "border": "1px solid var(--fmed-d3-border)",
    "color": "var(--fmed-d3-text)",
    "textAlign": "left",
    "cursor": "pointer",
    "boxShadow": "none"
  },
  "fmedNeoUrgentList": {
    "display": "grid",
    "gap": 10
  },
  "fmedNeoUrgentRow": {
    "width": "100%",
    "minHeight": 64,
    "display": "grid",
    "gridTemplateColumns": "54px 1fr auto",
    "gap": "12px",
    "alignItems": "center",
    "padding": "12px",
    "borderRadius": 18,
    "background": "var(--fmed-d3-soft)",
    "border": "1px solid var(--fmed-d3-border)",
    "color": "var(--fmed-d3-text)",
    "textAlign": "left",
    "cursor": "pointer",
    "boxShadow": "none"
  },
  "fmedNeoUrgentIcon": {
    "width": 40,
    "height": 40,
    "borderRadius": 14,
    "display": "grid",
    "alignItems": "center",
    "justifyContent": "center",
    "placeItems": "center"
  },
  "fmedNeoUrgentText": {
    "display": "flex",
    "flexDirection": "column",
    "gap": "4px",
    "minWidth": 0
  },
  "fmedNeoBadgeCritical": {
    "padding": "6px 9px",
    "borderRadius": "9px",
    "color": "#FF7A7A",
    "background": "rgba(255,77,77,.16)",
    "fontStyle": "normal",
    "fontSize": "11px",
    "fontWeight": 850
  },
  "fmedNeoBadgeImportant": {
    "padding": "6px 9px",
    "borderRadius": "9px",
    "color": "#FFB020",
    "background": "rgba(255,176,32,.14)",
    "fontStyle": "normal",
    "fontSize": "11px",
    "fontWeight": 850
  },
  "fmedNeoEmptyState": {
    "padding": "18px",
    "borderRadius": "14px",
    "color": "var(--fmed-d3-muted)",
    "background": "var(--fmed-d3-soft)",
    "border": "1px dashed var(--fmed-d3-border)"
  },
  "fmedNeoLowerGrid": {
    "display": "grid",
    "gridTemplateColumns": "repeat(2, minmax(0,1fr))",
    "gap": 16,
    "marginBottom": 0,
    "marginTop": 14
  },
  "fmedNeoMiniPanel": {
    "minHeight": 240,
    "padding": 18,
    "borderRadius": 28,
    "background": "var(--fmed-d3-card)",
    "border": "1px solid var(--fmed-d3-border)",
    "boxShadow": "var(--fmed-d3-shadow-soft)",
    "color": "var(--fmed-d3-text)",
    "overflow": "hidden"
  },
  "fmedNeoQuickPanel": {
    "minHeight": "auto",
    "padding": "18px",
    "borderRadius": 28,
    "background": "var(--fmed-d3-card)",
    "border": "1px solid var(--fmed-d3-border)",
    "boxShadow": "var(--fmed-d3-shadow-soft)",
    "color": "var(--fmed-d3-text)",
    "marginBottom": 0,
    "order": -1,
    "position": "relative",
    "zIndex": 2,
    "overflow": "hidden"
  },
  "fmedNeoDonutArea": {
    "display": "grid",
    "gridTemplateColumns": "170px minmax(0,1fr)",
    "gap": 22,
    "alignItems": "center",
    "marginTop": 14
  },
  "fmedNeoDonutInterventi": {
    "width": "132px",
    "height": "132px",
    "borderRadius": "999px",
    "background": "conic-gradient(#1FAE9C 0 25%, #35C2A9 25% 55%, #FFB020 55% 74%, #7C6A45 74% 86%, #2FE58B 86% 100%)",
    "boxShadow": "inset 0 0 0 42px #FFFFFF, 0 14px 32px rgba(8,32,51,.08)",
    "display": "flex",
    "alignItems": "center",
    "justifyContent": "center",
    "color": "var(--fmed-text)",
    "fontWeight": 850
  },
  "fmedNeoDonutAsset": {
    "width": "132px",
    "height": "132px",
    "borderRadius": "999px",
    "background": "conic-gradient(#1FAE9C 0 45%, #2FE58B 45% 68%, #FFB020 68% 82%, #7C6A45 82% 100%)",
    "boxShadow": "inset 0 0 0 42px #FFFFFF, 0 14px 32px rgba(8,32,51,.08)",
    "display": "flex",
    "alignItems": "center",
    "justifyContent": "center",
    "color": "var(--fmed-text)",
    "fontWeight": 850
  },
  "fmedNeoDonutLegend": {
    "display": "grid",
    "gap": "8px",
    "color": "var(--fmed-text)",
    "fontSize": "13px"
  },
  "fmedNeoQuickGrid": {
    "display": "grid",
    "gridTemplateColumns": "repeat(6, minmax(0, 1fr))",
    "gap": 12,
    "marginTop": 0,
    "alignItems": "stretch"
  },
  "fmedNeoQuickBtn": {
    "minHeight": 92,
    "padding": "15px 12px",
    "borderRadius": 20,
    "background": "var(--fmed-d3-soft)",
    "border": "1px solid var(--fmed-d3-border)",
    "color": "var(--fmed-d3-text)",
    "display": "flex",
    "flexDirection": "column",
    "alignItems": "center",
    "justifyContent": "center",
    "gap": 9,
    "cursor": "pointer",
    "boxShadow": "none",
    "fontWeight": 500,
    "fontSize": "12px",
    "height": "100%",
    "whiteSpace": "normal",
    "textAlign": "center",
    "lineHeight": 1.12,
    "overflow": "hidden",
    "overflowWrap": "anywhere",
    "WebkitTextFillColor": "var(--fmed-text)"
  },
  "fmedNeoActivityPanel": {
    "padding": 18,
    "borderRadius": 28,
    "background": "var(--fmed-d3-card)",
    "border": "1px solid var(--fmed-d3-border)",
    "boxShadow": "var(--fmed-d3-shadow-soft)",
    "color": "var(--fmed-d3-text)",
    "marginTop": 0,
    "overflow": "hidden"
  },
  "fmedNeoActivityList": {
    "display": "grid",
    "gap": 10
  },
  "fmedNeoActivityRow": {
    "width": "100%",
    "minHeight": 56,
    "display": "grid",
    "gridTemplateColumns": "34px minmax(0,1fr) auto auto",
    "gap": 10,
    "alignItems": "center",
    "padding": "10px 12px",
    "borderRadius": 18,
    "background": "var(--fmed-d3-soft)",
    "border": "1px solid var(--fmed-d3-border)",
    "color": "var(--fmed-d3-text)",
    "textAlign": "left",
    "cursor": "pointer",
    "boxShadow": "none",
    "overflow": "hidden"
  },
  "fmedNeoActivityDot": {
    "width": 30,
    "height": 30,
    "borderRadius": 12,
    "display": "grid",
    "alignItems": "center",
    "justifyContent": "center",
    "color": "#1FAE9C",
    "border": "1px solid rgba(31,174,156,.22)",
    "placeItems": "center",
    "background": "rgba(31,174,156,.12)",
    "fontWeight": 950
  },
  "fmedNeoIconCyan": {
    "color": "#1FAE9C",
    "background": "rgba(31,174,156,.12)",
    "borderColor": "rgba(31,174,156,.24)",
    "boxShadow": "none"
  },
  "fmedNeoIconGreen": {
    "color": "#39C97C",
    "background": "rgba(57,201,124,.12)",
    "borderColor": "rgba(57,201,124,.22)",
    "boxShadow": "none"
  },
  "fmedNeoIconAmber": {
    "color": "#D89A2A",
    "background": "rgba(216,154,42,.14)",
    "borderColor": "rgba(216,154,42,.25)",
    "boxShadow": "none"
  },
  "fmedNeoIconBlue": {
    "color": "#6DB193",
    "background": "rgba(109,177,147,.12)",
    "borderColor": "rgba(109,177,147,.22)",
    "boxShadow": "none"
  },
  "fmedNeoIconPurple": {
    "color": "#7C6A45",
    "background": "rgba(124,106,69,.12)",
    "borderColor": "rgba(124,106,69,.22)",
    "boxShadow": "none"
  },
  "fmedNeoKpiPurple": {
    "boxShadow": "var(--fmed-d3-shadow-soft)",
    "borderTop": "4px solid #7C6A45"
  },
  "fmedNeoTrendPurple": {
    "gridColumn": "2 / 3",
    "color": "#7C6A45",
    "fontStyle": "normal",
    "fontWeight": 500,
    "fontSize": 11,
    "display": "block",
    "width": "100%",
    "minWidth": 0,
    "whiteSpace": "nowrap",
    "overflowWrap": "anywhere",
    "lineHeight": 1.15,
    "marginTop": "2px",
    "alignSelf": "start",
    "margin": 0,
    "padding": 0,
    "borderRadius": 999,
    "overflow": "hidden",
    "textOverflow": "ellipsis",
    "maxWidth": "100%",
    "background": "transparent",
    "WebkitTextFillColor": "var(--fmed-muted)",
    "border": 0,
    "boxShadow": "none",
    "letterSpacing": ".02em"
  },
  "fmedNeoPanelTitleWithIcon": {
    "margin": "0 0 14px",
    "color": "var(--fmed-d3-title)",
    "fontSize": 18,
    "lineHeight": 1.18,
    "fontWeight": 500,
    "display": "flex",
    "alignItems": "center",
    "gap": 10,
    "letterSpacing": "-.02em",
    "WebkitTextFillColor": "var(--fmed-d3-title)"
  },
  "fmedNeoSectionIcon": {
    "width": 42,
    "height": 42,
    "borderRadius": 16,
    "display": "grid",
    "alignItems": "center",
    "justifyContent": "center",
    "border": "1px solid rgba(31,174,156,.22)",
    "color": "#1FAE9C",
    "background": "rgba(31,174,156,.12)",
    "minWidth": 42,
    "placeItems": "center",
    "boxShadow": "none"
  },
  "fmedNeoSvgDonutWrap": {
    "position": "relative",
    "width": 168,
    "height": 168,
    "display": "flex",
    "alignItems": "center",
    "justifyContent": "center",
    "filter": "none"
  },
  "fmedNeoDonutSvg": {
    "width": 168,
    "height": 168,
    "overflow": "visible"
  },
  "fmedNeoDonutCenter": {
    "position": "absolute",
    "inset": 45,
    "borderRadius": 999,
    "background": "var(--fmed-d3-card)",
    "border": "1px solid var(--fmed-d3-border)",
    "display": "flex",
    "flexDirection": "column",
    "alignItems": "center",
    "justifyContent": "center",
    "color": "var(--fmed-d3-title)",
    "boxShadow": "inset 0 1px 0 rgba(255,255,255,.08)",
    "pointerEvents": "none"
  },
  "fmedNeoDonutLegendEnhanced": {
    "display": "grid",
    "gap": 9,
    "color": "var(--fmed-d3-text)",
    "fontSize": 13,
    "minWidth": 0,
    "overflow": "hidden"
  },
  "kpiCard": {
    "background": "linear-gradient(145deg, rgba(10,35,52,.96), rgba(6,20,32,.96))",
    "color": "#F4FBFF",
    "border": "1px solid rgba(31,174,156,.20)",
    "borderRadius": "18px"
  },
  "filterCard": {
    "background": "linear-gradient(145deg, rgba(10,35,52,.96), rgba(6,20,32,.96))",
    "color": "#F4FBFF",
    "border": "1px solid rgba(31,174,156,.20)",
    "borderRadius": "18px"
  },
  "textarea": {
    "background": "var(--fmed-surface-solid)",
    "color": "var(--fmed-text)",
    "border": "1px solid var(--fmed-border)",
    "borderRadius": 14,
    "padding": "10px 12px",
    "outline": "none"
  },
  "sidebarLogoBox": {
    "padding": "6px 2px 18px",
    "borderBottom": "1px solid rgba(31,174,156,.10)"
  },
  "sidebarTitle": {
    "color": "var(--fmed-text)",
    "letterSpacing": ".02em",
    "fontWeight": 950,
    "textShadow": "none",
    "textTransform": "uppercase"
  },
  "sidebarSubtitle": {
    "color": "var(--fmed-muted)",
    "fontWeight": 800,
    "letterSpacing": ".16em",
    "textTransform": "uppercase"
  },
  "fmedNeoTrendCyan": {
    "color": "#147C72",
    "fontWeight": 500,
    "fontStyle": "normal"
  },
  "fmedNeoTrendGreen": {
    "color": "#2FE58B",
    "fontWeight": 800,
    "fontStyle": "normal"
  },
  "fmedNeoTrendAmber": {
    "color": "#FFB020",
    "fontWeight": 800,
    "fontStyle": "normal"
  },
  "fmedNeoChartSvg": {
    "width": "100%",
    "height": "clamp(190px, 55vw, 280px)",
    "marginTop": "14px",
    "filter": "drop-shadow(0 12px 20px rgba(0,0,0,.28))",
    "maxWidth": "100%"
  },
  "fmedNeoStatTiles": {
    "gridTemplateColumns": "repeat(4, minmax(0,1fr))",
    "gap": "14px",
    "marginTop": "18px"
  },
  "fmedNeoStatTile": {
    "minHeight": "72px",
    "borderRadius": "14px",
    "background": "rgba(9,31,48,.70)",
    "border": "1px solid rgba(31,174,156,.18)",
    "color": "#F7F9FB"
  },
  "fmedNeoUrgentPanel": {
    "minHeight": "430px",
    "padding": "24px",
    "borderRadius": "18px",
    "background": "linear-gradient(145deg,rgba(10,35,52,.96),rgba(5,18,30,.97))",
    "border": "1px solid rgba(31,174,156,.22)",
    "boxShadow": "0 22px 52px rgba(0,0,0,.30)"
  },
  "fmedNeoUrgentItem": {
    "minHeight": "84px",
    "padding": "14px 16px",
    "borderRadius": "15px",
    "gridTemplateColumns": "56px 1fr auto",
    "background": "linear-gradient(90deg,rgba(255,77,94,.105),rgba(255,255,255,.035))",
    "border": "1px solid rgba(255,255,255,.055)"
  },
  "dangerButton": {
    "borderRadius": 13,
    "background": "linear-gradient(135deg, #DC3545 0%, #A92331 100%)",
    "color": "#FFFFFF",
    "border": "1px solid rgba(220,53,69,.36)",
    "minHeight": 38,
    "padding": "0 12px",
    "fontWeight": 900,
    "boxShadow": "0 12px 24px rgba(220,53,69,.18)",
    "whiteSpace": "nowrap"
  },
  "smallLabel": {
    "color": "#7FE2CC",
    "fontSize": "12px",
    "letterSpacing": ".08em",
    "textTransform": "uppercase",
    "fontWeight": 800
  },
  "statusPill": {
    "minHeight": "30px",
    "borderRadius": "999px",
    "background": "rgba(31,174,156,.10)",
    "color": "var(--fmed-primary)",
    "border": "1px solid rgba(31,174,156,.22)",
    "fontWeight": 800
  },
  "fmedNeoQuickBtnAlert": {
    "borderColor": "rgba(47,229,139,.34)",
    "color": "var(--fmed-d3-title)",
    "background": "linear-gradient(135deg, rgba(216,154,42,.18), rgba(31,174,156,.08))",
    "border": "1px solid rgba(216,154,42,.32)",
    "boxShadow": "none",
    "WebkitTextFillColor": "#FFFFFF"
  },
  "navBtn": {
    "whiteSpace": "normal",
    "overflowWrap": "anywhere",
    "lineHeight": 1.18
  },
  "fmedNeoKpiValue": {
    "fontSize": "clamp(24px, 7vw, 38px)",
    "lineHeight": 1,
    "color": "var(--fmed-text)",
    "fontWeight": 850
  },
  "sidebarUserCardLight": {
    "display": "flex",
    "alignItems": "center",
    "gap": "10px",
    "padding": "10px 12px",
    "borderRadius": "16px",
    "background": "linear-gradient(145deg, #FFFFFF 0%, #F5FBFD 100%)",
    "border": "1px solid rgba(9, 54, 78, .10)",
    "color": "#082033",
    "backdropFilter": "blur(8px)",
    "minHeight": "58px",
    "boxShadow": "0 12px 28px rgba(8, 32, 51, .08)"
  },
  "sidebarUserAvatarLight": {
    "width": "34px",
    "height": "34px",
    "borderRadius": "12px",
    "display": "flex",
    "alignItems": "center",
    "justifyContent": "center",
    "background": "linear-gradient(135deg, rgba(18,184,200,.16), rgba(18,184,200,.06))",
    "color": "#087A8D",
    "fontSize": "14px",
    "fontWeight": 500,
    "flex": "0 0 auto",
    "minWidth": "34px",
    "border": "1px solid rgba(18,184,200,.18)",
    "boxShadow": "none"
  },
  "sidebarUserNameLight": {
    "color": "#082033",
    "fontSize": "12px",
    "lineHeight": "15px",
    "letterSpacing": "0.04em",
    "whiteSpace": "nowrap",
    "overflow": "hidden",
    "textOverflow": "ellipsis",
    "fontWeight": 600
  },
  "sidebarUserRoleLight": {
    "color": "#637287",
    "fontSize": "9px",
    "lineHeight": "12px",
    "letterSpacing": ".08em",
    "textTransform": "uppercase",
    "whiteSpace": "nowrap",
    "overflow": "hidden",
    "textOverflow": "ellipsis",
    "opacity": 1
  },
  "sidebarRoleHintLight": {
    "marginTop": 10,
    "padding": "0 8px",
    "borderRadius": "10px",
    "background": "rgba(255,255,255,.07)",
    "border": "1px solid rgba(255,255,255,.13)",
    "color": "rgba(255,255,255,0.72)",
    "fontSize": "9px",
    "letterSpacing": ".06em",
    "textTransform": "uppercase",
    "lineHeight": "12px",
    "textAlign": "center",
    "minHeight": "28px",
    "fontWeight": 500,
    "height": "28px",
    "display": "none"
  },
  "sidebarLogoutSmallBtnLight": {
    "minHeight": "36px",
    "height": "36px",
    "padding": "0 8px",
    "borderRadius": "14px",
    "border": "1px solid rgba(9, 54, 78, .10)",
    "background": "#FFFFFF",
    "color": "#082033",
    "cursor": "pointer",
    "display": "inline-flex",
    "alignItems": "center",
    "justifyContent": "center",
    "gap": "6px",
    "fontSize": "10px",
    "lineHeight": "12px",
    "fontWeight": 500,
    "letterSpacing": ".04em",
    "textTransform": "uppercase",
    "boxShadow": "0 10px 24px rgba(8,32,51,.06)",
    "width": "100%"
  },
  "sidebarCollapsed": {
    "width": "86px",
    "minWidth": "86px",
    "padding": "18px 12px",
    "alignItems": "center",
    "maxWidth": "86px",
    "flex": "0 0 86px",
    "overflow": "hidden"
  },
  "sidebarCollapseTop": {
    "display": "flex",
    "justifyContent": "flex-end",
    "marginBottom": "8px"
  },
  "sidebarCollapseTopCentered": {
    "display": "flex",
    "justifyContent": "center",
    "width": "100%",
    "marginBottom": "8px"
  },
  "sidebarCollapseBtn": {
    "width": 42,
    "height": 38,
    "borderRadius": 14,
    "border": "1px solid rgba(0,122,140,.18)",
    "background": "rgba(255,255,255,.78)",
    "color": "#083B46",
    "cursor": "pointer",
    "fontSize": 18,
    "boxShadow": "0 8px 18px rgba(6,34,55,.10)"
  },
  "sidebarBrandLinkCollapsed": {
    "justifyContent": "center",
    "alignItems": "center",
    "width": "100%",
    "minHeight": 46,
    "padding": 0
  },
  "sidebarOnlyTitleCollapsed": {
    "width": 42,
    "height": 42,
    "borderRadius": 16,
    "display": "flex",
    "alignItems": "center",
    "justifyContent": "center",
    "background": "linear-gradient(135deg,#0B7C86,#0A5968)",
    "color": "#FFFFFF",
    "fontSize": 14,
    "fontWeight": 700,
    "letterSpacing": 1
  },
  "sidebarBottomPanelCollapsed": {
    "alignItems": "center",
    "width": "100%"
  },
  "assetStickyCol": {
    "position": "sticky",
    "left": 0,
    "zIndex": 5,
    "background": "var(--fmed-surface-soft)",
    "boxShadow": "8px 0 18px rgba(8,32,51,.05)"
  },
  "assetStickyColBody": {
    "position": "sticky",
    "left": 0,
    "zIndex": 2,
    "background": "var(--fmed-surface-solid)",
    "boxShadow": "8px 0 18px rgba(8,32,51,.05)"
  },
  "assetQuickInput": {
    "width": "100%",
    "minWidth": 120,
    "height": 36,
    "borderRadius": 12,
    "border": "1px solid var(--fmed-border)",
    "background": "var(--fmed-surface-solid)",
    "color": "var(--fmed-text)",
    "padding": "0 10px",
    "boxSizing": "border-box",
    "fontSize": 13,
    "outline": "none",
    "minHeight": 36,
    "fontWeight": 750
  },
  "assetQuickSelect": {
    "width": "100%",
    "minWidth": 150,
    "height": 36,
    "borderRadius": 12,
    "border": "1px solid var(--fmed-border)",
    "background": "var(--fmed-surface-solid)",
    "color": "var(--fmed-text)",
    "padding": "0 10px",
    "boxSizing": "border-box",
    "fontSize": 12,
    "outline": "none",
    "minHeight": 36,
    "fontWeight": 850
  },
  "assetQuickActions": {
    "display": "flex",
    "gap": 6,
    "alignItems": "center"
  },
  "assetQuickEditBtn": {
    "border": "1px solid var(--fmed-border)",
    "background": "var(--fmed-surface-solid)",
    "color": "var(--fmed-primary)",
    "borderRadius": 12,
    "padding": "8px 10px",
    "cursor": "pointer",
    "fontSize": 12,
    "fontWeight": 950,
    "whiteSpace": "nowrap",
    "minHeight": 36
  },
  "assetQuickSaveBtn": {
    "border": "1px solid rgba(109,177,147,.28)",
    "background": "linear-gradient(135deg, #2E8B57, #6DB193)",
    "color": "#FFFFFF",
    "borderRadius": 12,
    "padding": "8px 10px",
    "cursor": "pointer",
    "fontSize": 13,
    "minHeight": 36,
    "fontWeight": 950,
    "whiteSpace": "nowrap"
  },
  "assetQuickCancelBtn": {
    "border": "1px solid rgba(220,53,69,.24)",
    "background": "rgba(220,53,69,.10)",
    "color": "#DC3545",
    "borderRadius": 12,
    "padding": "8px 10px",
    "cursor": "pointer",
    "fontSize": 13,
    "minHeight": 36,
    "fontWeight": 950,
    "whiteSpace": "nowrap"
  },
  "fmedNeoKpiMainNumber": {
    "display": "block",
    "fontSize": "clamp(27px, 2.1vw, 38px)",
    "lineHeight": 1,
    "whiteSpace": "nowrap",
    "overflow": "hidden",
    "textOverflow": "ellipsis",
    "color": "var(--fmed-d3-title)",
    "fontWeight": 500,
    "letterSpacing": "-.045em",
    "WebkitTextFillColor": "var(--fmed-d3-title)"
  },
  "fmedAuditQualityPanel": {
    "margin": "0 0 16px",
    "padding": "18px",
    "borderRadius": 22,
    "background": "var(--fmed-card-gradient)",
    "border": "1px solid var(--fmed-border)",
    "boxShadow": "var(--fmed-card-shadow)",
    "overflow": "hidden",
    "color": "var(--fmed-text)"
  },
  "fmedAuditQualityHead": {
    "display": "flex",
    "justifyContent": "space-between",
    "alignItems": "center",
    "gap": "16px",
    "flexWrap": "wrap",
    "marginBottom": "14px"
  },
  "fmedAuditEyebrow": {
    "fontSize": "11px",
    "letterSpacing": "1.6px",
    "color": "var(--fmed-primary, #078093)",
    "fontWeight": 850
  },
  "fmedAuditTitle": {
    "margin": "4px 0 4px",
    "color": "var(--fmed-text, #0A1F33)",
    "fontSize": "20px",
    "fontWeight": 850,
    "letterSpacing": ".02em"
  },
  "fmedAuditSubtitle": {
    "margin": 0,
    "color": "var(--fmed-muted, #657789)",
    "fontSize": "13px",
    "lineHeight": 1.35
  },
  "fmedAuditScoreBox": {
    "minWidth": "130px",
    "padding": "12px 14px",
    "borderRadius": 16,
    "textAlign": "center",
    "color": "var(--fmed-text)",
    "background": "var(--fmed-surface)",
    "boxShadow": "0 8px 22px rgba(8,32,51,.055)",
    "border": "1px solid var(--fmed-border)",
    "WebkitTextFillColor": "var(--fmed-text)"
  },
  "fmedAuditScoreMain": {
    "display": "block",
    "fontSize": "28px",
    "lineHeight": 1,
    "fontWeight": 900
  },
  "fmedAuditMetricGrid": {
    "display": "grid",
    "gridTemplateColumns": "repeat(auto-fit, minmax(180px, 1fr))",
    "gap": 10,
    "marginBottom": "14px"
  },
  "fmedAuditMetric": {
    "padding": "14px",
    "borderRadius": 15,
    "background": "var(--fmed-surface)",
    "border": "1px solid var(--fmed-border)",
    "color": "var(--fmed-text)",
    "WebkitTextFillColor": "var(--fmed-text)",
    "boxShadow": "var(--fmed-card-shadow-soft)"
  },
  "fmedAuditMetricMain": {
    "display": "block",
    "fontSize": "24px",
    "fontWeight": 900,
    "lineHeight": 1
  },
  "fmedAuditMetricSpan": {
    "display": "block",
    "marginTop": "7px",
    "fontSize": "11px",
    "letterSpacing": ".08em",
    "color": "var(--fmed-muted, #657789)",
    "fontWeight": 800
  },
  "fmedAuditActions": {
    "display": "flex",
    "gap": "10px",
    "flexWrap": "wrap"
  },
  "sidebarButton": {
    "color": "var(--fmed-sidebar-text)",
    "borderRadius": 14,
    "minHeight": 44,
    "padding": "11px 13px",
    "fontWeight": 820,
    "background": "transparent",
    "border": "1px solid transparent"
  },
  "sidebarButtonActive": {
    "background": "linear-gradient(135deg, rgba(255,255,255,.16), rgba(255,255,255,.08))",
    "color": "#FFFFFF",
    "border": "1px solid rgba(255,255,255,.18)",
    "boxShadow": "0 14px 26px rgba(0,0,0,.16)"
  },
  "pageHeader": {
    "background": "var(--fmed-card-gradient)",
    "color": "var(--fmed-text)",
    "border": "1px solid var(--fmed-border)",
    "borderRadius": 22,
    "boxShadow": "var(--fmed-card-shadow-soft)"
  },
  "pageSubtitle": {
    "color": "var(--fmed-muted)"
  },
  "fmedNeoKpiLabel": {
    "color": "var(--fmed-d3-muted)",
    "fontWeight": 500,
    "letterSpacing": ".04em",
    "fontSize": 12,
    "textTransform": "uppercase",
    "whiteSpace": "normal"
  },
  "fmedNeoChartPanel": {
    "padding": 18,
    "borderRadius": 28,
    "background": "var(--fmed-d3-card)",
    "border": "1px solid var(--fmed-d3-border)",
    "boxShadow": "var(--fmed-d3-shadow-soft)",
    "overflow": "hidden",
    "minHeight": 380,
    "color": "var(--fmed-d3-text)"
  },
  "assetKpiSub": {
    "marginTop": 7,
    "color": "var(--fmed-muted)",
    "fontSize": 12,
    "fontWeight": 750
  },
  "appShell": {
    "background": "var(--fmed-main-bg)",
    "color": "var(--fmed-text)"
  },
  "interventiPageShell": {
    "display": "flex",
    "flexDirection": "column",
    "gap": 16,
    "width": "100%",
    "maxWidth": "none",
    "margin": 0,
    "minWidth": 0
  },
  "interventiHeroPanel": {
    "position": "relative",
    "overflow": "hidden",
    "display": "grid",
    "gridTemplateColumns": "minmax(0, 1fr) 210px",
    "alignItems": "stretch",
    "gap": 18,
    "padding": "20px 22px",
    "borderRadius": 24,
    "background": "linear-gradient(135deg, rgba(8,20,28,.98) 0%, rgba(12,33,42,.96) 62%, rgba(18,87,78,.92) 100%)",
    "border": "1px solid rgba(127,226,204,.20)",
    "boxShadow": "0 26px 70px rgba(4,13,18,.18)",
    "color": "#F5FBFA"
  },
  "interventiHeroLeft": {
    "display": "flex",
    "flexDirection": "column",
    "justifyContent": "center",
    "gap": 10,
    "minWidth": 0
  },
  "interventiHeroEyebrow": {
    "alignSelf": "flex-start",
    "display": "inline-flex",
    "alignItems": "center",
    "gap": 8,
    "padding": "8px 12px",
    "borderRadius": 999,
    "fontSize": 11,
    "fontWeight": 700,
    "letterSpacing": ".13em",
    "textTransform": "uppercase",
    "color": "#7FE2CC",
    "background": "rgba(31,174,156,.12)",
    "border": "1px solid rgba(127,226,204,.22)"
  },
  "interventiHeroTitle": {
    "margin": 0,
    "fontSize": "clamp(30px, 3vw, 48px)",
    "lineHeight": 1.02,
    "letterSpacing": "-.045em",
    "fontWeight": 500,
    "color": "var(--fmed-text)"
  },
  "interventiHeroSubtitle": {
    "margin": 0,
    "maxWidth": 760,
    "fontSize": 15,
    "lineHeight": 1.65,
    "color": "rgba(234,247,244,.74)"
  },
  "interventiHeroRight": {
    "display": "flex",
    "flexDirection": "column",
    "justifyContent": "center",
    "alignItems": "center",
    "minHeight": 126,
    "padding": 16,
    "borderRadius": 20,
    "background": "rgba(255,255,255,.075)",
    "border": "1px solid rgba(255,255,255,.11)",
    "boxShadow": "inset 0 1px 0 rgba(255,255,255,.08)"
  },
  "interventiHeroBadgeNumber": {
    "fontSize": "clamp(42px, 4vw, 64px)",
    "lineHeight": 1,
    "fontWeight": 400,
    "letterSpacing": "-.06em",
    "color": "#7FE2CC"
  },
  "interventiHeroBadgeText": {
    "marginTop": 8,
    "fontSize": 13,
    "fontWeight": 700,
    "letterSpacing": ".08em",
    "textTransform": "uppercase",
    "color": "#F7FFFD"
  },
  "interventiHeroBadgeSub": {
    "marginTop": 5,
    "fontSize": 12,
    "color": "rgba(234,247,244,.64)"
  },
  "interventiPanel": {
    "padding": 22,
    "borderRadius": 28,
    "background": "var(--fmed-card)",
    "border": "1px solid var(--fmed-d3-border)",
    "boxShadow": "0 18px 50px rgba(10,22,30,.08)"
  },
  "interventiPanelHeader": {
    "display": "flex",
    "alignItems": "flex-start",
    "justifyContent": "space-between",
    "gap": 18,
    "marginBottom": 16
  },
  "interventiSectionTitle": {
    "margin": 0,
    "fontSize": 19,
    "lineHeight": 1.15,
    "fontWeight": 500,
    "letterSpacing": "-.025em",
    "color": "var(--fmed-title)"
  },
  "interventiSectionSubtitle": {
    "margin": "6px 0 0",
    "fontSize": 13,
    "lineHeight": 1.55,
    "color": "var(--fmed-muted)"
  },
  "interventiSearchRow": {
    "display": "grid",
    "gridTemplateColumns": "minmax(0, 1fr) auto",
    "gap": 12,
    "alignItems": "center"
  },
  "interventiInputWide": {
    "minHeight": 48,
    "width": "100%",
    "borderRadius": 16,
    "padding": "0 16px",
    "background": "var(--fmed-input-bg)",
    "border": "1px solid var(--fmed-d3-border)",
    "color": "var(--fmed-text)",
    "outline": "none",
    "fontSize": 14,
    "boxShadow": "inset 0 1px 0 rgba(255,255,255,.04)"
  },
  "interventiSearchButton": {
    "minHeight": 48,
    "border": "1px solid rgba(31,174,156,.30)",
    "borderRadius": 16,
    "padding": "0 18px",
    "background": "linear-gradient(135deg,#1FAE9C,#147C72)",
    "color": "#FFFFFF",
    "fontWeight": 700,
    "cursor": "pointer",
    "boxShadow": "0 12px 26px rgba(31,174,156,.18)"
  },
  "interventiSmartResultsBox": {
    "marginTop": 14,
    "display": "grid",
    "gap": 10,
    "padding": 12,
    "borderRadius": 20,
    "background": "var(--fmed-soft-panel)",
    "border": "1px solid var(--fmed-d3-border)"
  },
  "interventiSmartResultRow": {
    "width": "100%",
    "display": "flex",
    "justifyContent": "space-between",
    "alignItems": "center",
    "gap": 14,
    "padding": "12px 14px",
    "borderRadius": 16,
    "border": "1px solid var(--fmed-d3-border)",
    "background": "var(--fmed-card)",
    "color": "var(--fmed-text)",
    "cursor": "pointer",
    "textAlign": "left"
  },
  "interventiSmartResultCode": {
    "color": "#1FAE9C",
    "fontSize": 14,
    "letterSpacing": ".02em"
  },
  "interventiFilterChips": {
    "display": "flex",
    "flexWrap": "wrap",
    "gap": 10,
    "marginBottom": 16
  },
  "interventiChip": {
    "display": "inline-flex",
    "alignItems": "center",
    "gap": 8,
    "minHeight": 34,
    "padding": "0 12px",
    "borderRadius": 999,
    "fontSize": 12,
    "fontWeight": 700,
    "color": "#167F73",
    "background": "rgba(31,174,156,.10)",
    "border": "1px solid rgba(31,174,156,.22)"
  },
  "interventiFiltersGrid": {
    "display": "grid",
    "gridTemplateColumns": "repeat(4, minmax(190px, 1fr))",
    "gap": 12,
    "alignItems": "end"
  },
  "interventiSelectLarge": {
    "minHeight": 46,
    "width": "100%",
    "borderRadius": 15,
    "padding": "0 38px 0 13px",
    "background": "var(--fmed-input-bg)",
    "border": "1px solid var(--fmed-d3-border)",
    "color": "var(--fmed-text)",
    "outline": "none",
    "fontSize": 13,
    "fontWeight": 500
  },
  "interventiDateFilterGroup": {
    "display": "flex",
    "flexDirection": "column",
    "gap": 6
  },
  "interventiDateFilterLabel": {
    "fontSize": 11,
    "fontWeight": 700,
    "letterSpacing": ".08em",
    "textTransform": "uppercase",
    "color": "var(--fmed-muted)"
  },
  "interventiActionsBar": {
    "display": "flex",
    "flexWrap": "wrap",
    "gap": 10,
    "marginTop": 18
  },
  "interventiPrimaryAction": {
    "minHeight": 46,
    "border": "1px solid rgba(31,174,156,.30)",
    "borderRadius": 15,
    "padding": "0 16px",
    "background": "linear-gradient(135deg,#1FAE9C,#147C72)",
    "color": "#FFFFFF",
    "fontWeight": 800,
    "cursor": "pointer",
    "boxShadow": "0 14px 28px rgba(31,174,156,.18)"
  },
  "interventiSecondaryAction": {
    "minHeight": 46,
    "border": "1px solid rgba(31,174,156,.22)",
    "borderRadius": 15,
    "padding": "0 16px",
    "background": "rgba(31,174,156,.10)",
    "color": "#167F73",
    "fontWeight": 800,
    "cursor": "pointer"
  },
  "interventiGhostAction": {
    "minHeight": 46,
    "border": "1px solid var(--fmed-d3-border)",
    "borderRadius": 15,
    "padding": "0 16px",
    "background": "var(--fmed-soft-panel)",
    "color": "var(--fmed-text)",
    "fontWeight": 700,
    "cursor": "pointer"
  },
  "interventiKpiGrid": {
    "display": "grid",
    "gridTemplateColumns": "repeat(4, minmax(0, 1fr))",
    "gap": 14
  },
  "interventiKpiCard": {
    "position": "relative",
    "overflow": "hidden",
    "display": "flex",
    "flexDirection": "column",
    "gap": 10,
    "minHeight": 138,
    "padding": 20,
    "borderRadius": 24,
    "background": "var(--fmed-card)",
    "border": "1px solid var(--fmed-d3-border)",
    "boxShadow": "0 18px 42px rgba(8,22,30,.08)"
  },
  "interventiKpiTop": {
    "display": "flex",
    "alignItems": "center",
    "justifyContent": "space-between",
    "gap": 10
  },
  "interventiKpiIcon": {
    "display": "grid",
    "placeItems": "center",
    "width": 40,
    "height": 40,
    "borderRadius": 14,
    "background": "rgba(31,174,156,.12)",
    "color": "#1FAE9C",
    "fontSize": 18
  },
  "interventiKpiLabel": {
    "flex": 1,
    "fontSize": 12,
    "fontWeight": 800,
    "textTransform": "uppercase",
    "letterSpacing": ".08em",
    "color": "var(--fmed-muted)"
  },
  "interventiKpiValue": {
    "fontSize": "clamp(27px, 2.2vw, 36px)",
    "lineHeight": 1,
    "fontWeight": 500,
    "letterSpacing": "-.055em",
    "color": "var(--fmed-title)"
  },
  "interventiKpiHint": {
    "fontSize": 12,
    "color": "var(--fmed-muted)"
  },
  "interventiTableCard": {
    "borderRadius": 28,
    "background": "var(--fmed-card)",
    "border": "1px solid var(--fmed-d3-border)",
    "boxShadow": "0 22px 56px rgba(8,22,30,.10)",
    "overflow": "hidden"
  },
  "interventiListHeader": {
    "display": "flex",
    "alignItems": "center",
    "justifyContent": "space-between",
    "gap": 16,
    "padding": "20px 22px",
    "borderBottom": "1px solid var(--fmed-d3-border)",
    "background": "var(--fmed-soft-panel)"
  },
  "interventiTableTitle": {
    "margin": 0,
    "fontSize": 19,
    "fontWeight": 500,
    "color": "var(--fmed-title)"
  },
  "interventiTableSubtitle": {
    "margin": "6px 0 0",
    "fontSize": 13,
    "color": "var(--fmed-muted)"
  },
  "interventiCloseBtn": {
    "minHeight": 42,
    "borderRadius": 14,
    "padding": "0 14px",
    "border": "1px solid var(--fmed-d3-border)",
    "background": "var(--fmed-card)",
    "color": "var(--fmed-text)",
    "fontWeight": 800,
    "cursor": "pointer"
  },
  "interventiTableWrap": {
    "width": "100%",
    "overflow": "auto",
    "maxHeight": "calc(100vh - 260px)"
  },
  "interventiTable": {
    "width": "100%",
    "minWidth": 1120,
    "borderCollapse": "separate",
    "borderSpacing": 0,
    "background": "var(--fmed-card)"
  },
  "interventiTh": {
    "position": "sticky",
    "top": 0,
    "zIndex": 1,
    "padding": "14px 14px",
    "borderBottom": "1px solid var(--fmed-d3-border)",
    "background": "var(--fmed-table-head)",
    "color": "var(--fmed-muted)",
    "fontSize": 11,
    "fontWeight": 800,
    "letterSpacing": ".09em",
    "textTransform": "uppercase",
    "textAlign": "left",
    "whiteSpace": "nowrap"
  },
  "interventiTr": {
    "background": "var(--fmed-card)"
  },
  "interventiTd": {
    "padding": "14px 14px",
    "borderBottom": "1px solid var(--fmed-d3-border)",
    "color": "var(--fmed-text)",
    "fontSize": 13,
    "lineHeight": 1.45,
    "verticalAlign": "middle"
  },
  "interventiTdCode": {
    "padding": "14px 14px",
    "borderBottom": "1px solid var(--fmed-d3-border)",
    "color": "#1FAE9C",
    "fontSize": 13,
    "fontWeight": 800,
    "letterSpacing": ".02em",
    "cursor": "pointer",
    "whiteSpace": "nowrap"
  },
  "scadenzePageShell": {
    "display": "flex",
    "flexDirection": "column",
    "gap": 16,
    "width": "100%",
    "maxWidth": "none",
    "margin": 0,
    "minWidth": 0
  },
  "scadenzeHeroPanel": {
    "position": "relative",
    "overflow": "hidden",
    "display": "grid",
    "gridTemplateColumns": "minmax(0, 1fr) 210px",
    "alignItems": "stretch",
    "gap": 18,
    "padding": "20px 22px",
    "borderRadius": 24,
    "background": "linear-gradient(135deg, rgba(8,20,28,.98) 0%, rgba(12,33,42,.96) 58%, rgba(39,87,69,.90) 100%)",
    "border": "1px solid rgba(127,226,204,.18)",
    "boxShadow": "0 26px 70px rgba(4,13,18,.18)",
    "color": "#F5FBFA"
  },
  "scadenzeHeroLeft": {
    "display": "flex",
    "flexDirection": "column",
    "justifyContent": "center",
    "gap": 10,
    "minWidth": 0
  },
  "scadenzeHeroEyebrow": {
    "alignSelf": "flex-start",
    "display": "inline-flex",
    "alignItems": "center",
    "gap": 8,
    "padding": "8px 12px",
    "borderRadius": 999,
    "fontSize": 11,
    "fontWeight": 800,
    "letterSpacing": ".13em",
    "textTransform": "uppercase",
    "color": "#D89A2A",
    "WebkitTextFillColor": "#D89A2A",
    "background": "rgba(216,154,42,.12)",
    "border": "1px solid rgba(216,154,42,.28)"
  },
  "scadenzeHeroTitle": {
    "margin": 0,
    "fontSize": "clamp(30px, 3vw, 48px)",
    "lineHeight": 1.02,
    "letterSpacing": "-.045em",
    "fontWeight": 500,
    "color": "var(--fmed-text)",
    "WebkitTextFillColor": "var(--fmed-text)"
  },
  "scadenzeHeroSubtitle": {
    "margin": 0,
    "maxWidth": 780,
    "fontSize": 15,
    "lineHeight": 1.65,
    "color": "rgba(234,247,244,.74)",
    "WebkitTextFillColor": "rgba(234,247,244,.74)"
  },
  "scadenzeHeroRight": {
    "display": "flex",
    "flexDirection": "column",
    "justifyContent": "center",
    "alignItems": "center",
    "minHeight": 168,
    "padding": 22,
    "borderRadius": 26,
    "background": "linear-gradient(135deg, rgba(31,174,156,.20), rgba(216,154,42,.15))",
    "border": "1px solid rgba(255,255,255,.11)",
    "boxShadow": "inset 0 1px 0 rgba(255,255,255,.08)"
  },
  "scadenzeHeroBadgeNumber": {
    "fontSize": "clamp(42px, 4vw, 64px)",
    "lineHeight": 1,
    "fontWeight": 400,
    "letterSpacing": "-.06em",
    "color": "#7FE2CC",
    "WebkitTextFillColor": "#7FE2CC"
  },
  "scadenzeHeroBadgeText": {
    "marginTop": 8,
    "fontSize": 13,
    "fontWeight": 800,
    "letterSpacing": ".08em",
    "textTransform": "uppercase",
    "color": "#F7FFFD",
    "WebkitTextFillColor": "#F7FFFD"
  },
  "scadenzeHeroBadgeSub": {
    "marginTop": 5,
    "fontSize": 12,
    "color": "rgba(234,247,244,.64)",
    "WebkitTextFillColor": "rgba(234,247,244,.64)"
  },
  "scadenzeFiltersPanel": {
    "padding": 16,
    "borderRadius": 22,
    "background": "var(--fmed-card)",
    "border": "1px solid var(--fmed-d3-border)",
    "boxShadow": "0 18px 50px rgba(10,22,30,.08)",
    "color": "var(--fmed-text)"
  },
  "scadenzeFiltersHeader": {
    "display": "flex",
    "justifyContent": "space-between",
    "alignItems": "flex-start",
    "gap": 18,
    "marginBottom": 16
  },
  "scadenzeSectionTitle": {
    "margin": 0,
    "fontSize": 19,
    "lineHeight": 1.15,
    "fontWeight": 500,
    "letterSpacing": "-.025em",
    "color": "var(--fmed-title)",
    "WebkitTextFillColor": "var(--fmed-title)"
  },
  "scadenzeSectionSubtitle": {
    "margin": "6px 0 0",
    "fontSize": 13,
    "lineHeight": 1.55,
    "color": "var(--fmed-muted)",
    "WebkitTextFillColor": "var(--fmed-muted)"
  },
  "scadenzeFilterChips": {
    "display": "flex",
    "alignItems": "center",
    "flexWrap": "wrap",
    "gap": 10
  },
  "scadenzeChip": {
    "display": "inline-flex",
    "alignItems": "center",
    "gap": 8,
    "minHeight": 34,
    "padding": "0 12px",
    "borderRadius": 999,
    "fontSize": 12,
    "fontWeight": 800,
    "color": "#167F73",
    "WebkitTextFillColor": "#167F73",
    "background": "rgba(31,174,156,.10)",
    "border": "1px solid rgba(31,174,156,.22)"
  },
  "scadenzeFiltersGrid": {
    "display": "grid",
    "gridTemplateColumns": "repeat(5, minmax(150px, 1fr))",
    "gap": 10,
    "alignItems": "end"
  },
  "scadenzeSelectLarge": {
    "minHeight": 46,
    "width": "100%",
    "borderRadius": 15,
    "padding": "0 38px 0 13px",
    "background": "var(--fmed-input-bg)",
    "border": "1px solid var(--fmed-d3-border)",
    "color": "var(--fmed-text)",
    "WebkitTextFillColor": "var(--fmed-text)",
    "outline": "none",
    "fontSize": 13,
    "fontWeight": 500,
    "boxShadow": "none"
  },
  "scadenzeInput": {
    "minHeight": 46,
    "width": "100%",
    "borderRadius": 15,
    "padding": "0 13px",
    "background": "var(--fmed-input-bg)",
    "border": "1px solid var(--fmed-d3-border)",
    "color": "var(--fmed-text)",
    "WebkitTextFillColor": "var(--fmed-text)",
    "outline": "none",
    "fontSize": 13,
    "fontWeight": 500,
    "boxSizing": "border-box",
    "boxShadow": "none"
  },
  "scadenzeDateFilterGroup": {
    "display": "flex",
    "flexDirection": "column",
    "gap": 6
  },
  "scadenzeDateFilterLabel": {
    "fontSize": 11,
    "fontWeight": 800,
    "letterSpacing": ".08em",
    "textTransform": "uppercase",
    "color": "var(--fmed-muted)",
    "WebkitTextFillColor": "var(--fmed-muted)"
  },
  "scadenzeActionsBar": {
    "display": "flex",
    "flexWrap": "wrap",
    "gap": 10,
    "marginTop": 18
  },
  "scadenzePrimaryAction": {
    "minHeight": 46,
    "border": "1px solid rgba(31,174,156,.30)",
    "borderRadius": 15,
    "padding": "0 16px",
    "background": "linear-gradient(135deg,#1FAE9C,#147C72)",
    "color": "#FFFFFF",
    "WebkitTextFillColor": "#FFFFFF",
    "fontWeight": 800,
    "cursor": "pointer",
    "boxShadow": "0 14px 28px rgba(31,174,156,.18)"
  },
  "scadenzeSecondaryAction": {
    "minHeight": 46,
    "border": "1px solid rgba(31,174,156,.22)",
    "borderRadius": 15,
    "padding": "0 16px",
    "background": "rgba(31,174,156,.10)",
    "color": "#167F73",
    "WebkitTextFillColor": "#167F73",
    "fontWeight": 800,
    "cursor": "pointer"
  },
  "scadenzeGhostAction": {
    "minHeight": 46,
    "border": "1px solid var(--fmed-d3-border)",
    "borderRadius": 15,
    "padding": "0 16px",
    "background": "var(--fmed-soft-panel)",
    "color": "var(--fmed-text)",
    "WebkitTextFillColor": "var(--fmed-text)",
    "fontWeight": 700,
    "cursor": "pointer"
  },
  "scadenzeKpiGrid": {
    "display": "grid",
    "gridTemplateColumns": "repeat(auto-fit, minmax(180px, 1fr))",
    "gap": 14
  },
  "scadenzeKpiCard": {
    "position": "relative",
    "overflow": "hidden",
    "display": "flex",
    "flexDirection": "column",
    "gap": 7,
    "minHeight": 104,
    "padding": 15,
    "borderRadius": 18,
    "background": "var(--fmed-card)",
    "border": "1px solid var(--fmed-d3-border)",
    "boxShadow": "0 18px 42px rgba(8,22,30,.08)"
  },
  "scadenzeKpiTop": {
    "display": "flex",
    "alignItems": "center",
    "justifyContent": "space-between",
    "gap": 10
  },
  "scadenzeKpiIcon": {
    "display": "grid",
    "placeItems": "center",
    "width": 40,
    "height": 40,
    "minWidth": 40,
    "borderRadius": 14,
    "background": "rgba(31,174,156,.12)",
    "color": "#1FAE9C",
    "WebkitTextFillColor": "#1FAE9C",
    "fontSize": 18
  },
  "scadenzeKpiLabel": {
    "flex": 1,
    "fontSize": 12,
    "fontWeight": 800,
    "textTransform": "uppercase",
    "letterSpacing": ".08em",
    "color": "var(--fmed-muted)",
    "WebkitTextFillColor": "var(--fmed-muted)"
  },
  "scadenzeKpiValue": {
    "fontSize": "clamp(27px, 2.2vw, 36px)",
    "lineHeight": 1,
    "fontWeight": 500,
    "letterSpacing": "-.055em",
    "color": "var(--fmed-title)",
    "WebkitTextFillColor": "var(--fmed-title)"
  },
  "scadenzeKpiHint": {
    "fontSize": 12,
    "color": "var(--fmed-muted)",
    "WebkitTextFillColor": "var(--fmed-muted)"
  },
  "scadenzeTableCard": {
    "borderRadius": 22,
    "minWidth": 0,
    "width": "100%",
    "background": "var(--fmed-card)",
    "border": "1px solid var(--fmed-d3-border)",
    "boxShadow": "0 22px 56px rgba(8,22,30,.10)",
    "overflow": "hidden"
  },
  "scadenzeListHeader": {
    "display": "flex",
    "alignItems": "center",
    "justifyContent": "space-between",
    "gap": 16,
    "padding": "20px 22px",
    "borderBottom": "1px solid var(--fmed-d3-border)",
    "background": "var(--fmed-soft-panel)"
  },
  "scadenzeTableTitle": {
    "margin": 0,
    "fontSize": 19,
    "fontWeight": 500,
    "color": "var(--fmed-title)",
    "WebkitTextFillColor": "var(--fmed-title)"
  },
  "scadenzeTableSubtitle": {
    "margin": "6px 0 0",
    "fontSize": 13,
    "color": "var(--fmed-muted)",
    "WebkitTextFillColor": "var(--fmed-muted)"
  },
  "scadenzeCloseBtn": {
    "minHeight": 42,
    "borderRadius": 14,
    "padding": "0 14px",
    "border": "1px solid var(--fmed-d3-border)",
    "background": "var(--fmed-card)",
    "color": "var(--fmed-text)",
    "WebkitTextFillColor": "var(--fmed-text)",
    "fontWeight": 800,
    "cursor": "pointer"
  },
  "scadenzeTableWrap": {
    "width": "100%",
    "overflow": "auto",
    "maxHeight": "calc(100vh - 260px)"
  },
  "scadenzeTable": {
    "width": "100%",
    "minWidth": 1450,
    "borderCollapse": "separate",
    "borderSpacing": 0,
    "background": "var(--fmed-card)"
  },
  "scadenzeTh": {
    "position": "sticky",
    "top": 0,
    "zIndex": 1,
    "padding": "14px 14px",
    "borderBottom": "1px solid var(--fmed-d3-border)",
    "background": "var(--fmed-table-head)",
    "color": "var(--fmed-muted)",
    "WebkitTextFillColor": "var(--fmed-muted)",
    "fontSize": 11,
    "fontWeight": 800,
    "letterSpacing": ".09em",
    "textTransform": "uppercase",
    "textAlign": "left",
    "whiteSpace": "nowrap"
  },
  "scadenzeTd": {
    "padding": "14px 14px",
    "borderBottom": "1px solid var(--fmed-d3-border)",
    "color": "var(--fmed-text)",
    "WebkitTextFillColor": "var(--fmed-text)",
    "fontSize": 13,
    "lineHeight": 1.45,
    "verticalAlign": "middle"
  },
  "scadenzeTdCode": {
    "padding": "14px 14px",
    "borderBottom": "1px solid var(--fmed-d3-border)",
    "color": "#1FAE9C",
    "WebkitTextFillColor": "#1FAE9C",
    "fontSize": 13,
    "fontWeight": 800,
    "letterSpacing": ".02em",
    "cursor": "pointer",
    "whiteSpace": "nowrap"
  },
  "scadenzeStatusDot": {
    "display": "inline-block",
    "width": 9,
    "height": 9,
    "minWidth": 9,
    "borderRadius": "50%",
    "marginRight": 8,
    "boxShadow": "0 0 0 3px rgba(255,255,255,.06)"
  }
};

const loginLightStyles = {
  "page": {
    "minHeight": "100vh",
    "display": "flex",
    "alignItems": "center",
    "justifyContent": "center",
    "padding": "24px",
    "background": "radial-gradient(circle at 16% 12%, rgba(35,198,214,0.16) 0%, transparent 34%), radial-gradient(circle at 84% 10%, rgba(47,211,125,0.10) 0%, transparent 28%), linear-gradient(135deg, #EEF2EE 0%, #E7EDE8 48%, #F4F6F2 100%)",
    "fontFamily": "'Futura', 'Futura PT', 'Jost', 'Century Gothic', sans-serif",
    "color": "#24312E"
  },
  "card": {
    "position": "relative",
    "width": "min(460px, 100%)",
    "background": "rgba(248,249,246,0.96)",
    "border": "1px solid rgba(49,95,90,0.16)",
    "borderRadius": "30px",
    "boxShadow": "0 28px 72px rgba(48,72,64,0.12), inset 0 1px 0 rgba(255,255,252,0.72)",
    "padding": "40px",
    "color": "#24312E",
    "backdropFilter": "blur(18px)"
  },
  "kicker": {
    "letterSpacing": "0.22em",
    "textTransform": "uppercase",
    "fontSize": "12px",
    "color": "#356F68",
    "marginBottom": "18px",
    "fontWeight": 500
  },
  "title": {
    "fontSize": "32px",
    "lineHeight": 1.08,
    "margin": "0 0 12px",
    "fontWeight": 500,
    "color": "#24312E"
  },
  "subtitle": {
    "fontSize": "14px",
    "lineHeight": 1.55,
    "color": "#64716D",
    "margin": "0 0 28px"
  },
  "form": {
    "display": "grid",
    "gap": "12px"
  },
  "label": {
    "fontSize": "11px",
    "letterSpacing": "0.17em",
    "textTransform": "uppercase",
    "color": "#356F68",
    "marginTop": "10px"
  },
  "input": {
    "width": "100%",
    "minHeight": "50px",
    "border": "1px solid rgba(49,95,90,0.18)",
    "borderRadius": "14px",
    "padding": "0 15px",
    "fontSize": "15px",
    "background": "rgba(244,246,242,0.98)",
    "color": "#24312E",
    "outline": "none",
    "boxShadow": "0 8px 20px rgba(48,72,64,0.045)"
  },
  "button": {
    "marginTop": "18px",
    "minHeight": "52px",
    "border": "1px solid rgba(49,95,90,0.28)",
    "borderRadius": "16px",
    "background": "linear-gradient(135deg, #356F68, #1FAE9C)",
    "color": "#FFFFFF",
    "cursor": "pointer",
    "letterSpacing": "0.15em",
    "textTransform": "uppercase",
    "fontSize": "13px",
    "fontWeight": 500,
    "boxShadow": "0 16px 36px rgba(49,95,90,0.17)"
  },
  "rememberRow": {
    "display": "flex",
    "alignItems": "center",
    "gap": "10px",
    "marginTop": "8px",
    "fontSize": "13px",
    "color": "#64716D"
  },
  "error": {
    "marginTop": "10px",
    "padding": "10px 12px",
    "borderRadius": "12px",
    "background": "rgba(255,77,94,0.09)",
    "border": "1px solid rgba(255,77,94,0.22)",
    "color": "#B4232F",
    "fontSize": "13px"
  },
  "versionText": {
    "marginTop": "16px",
    "textAlign": "center",
    "fontSize": "11px",
    "letterSpacing": "0.08em",
    "color": "#8AA0AE"
  },
  "themeToggle": {
    "position": "absolute",
    "top": "18px",
    "right": "18px",
    "display": "inline-flex",
    "alignItems": "center",
    "gap": "8px",
    "minHeight": "34px",
    "padding": "0 12px",
    "borderRadius": "999px",
    "border": "1px solid rgba(9, 74, 92, 0.14)",
    "background": "rgba(255,255,255,0.88)",
    "color": "#356F68",
    "cursor": "pointer",
    "fontSize": "11px",
    "letterSpacing": "0.08em",
    "textTransform": "uppercase",
    "boxShadow": "0 10px 24px rgba(8,32,51,0.08)"
  }
};

export { loginLightStyles };
export default styles;
