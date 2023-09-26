export const formatDate = (date: string, locale: string) => {
  if (!date || isNaN(Date.parse(date))) {
    return ""; // Return an empty string for invalid or missing dates
  }
  const dateObj = new Date(date);

  const adjustedLocale =
    locale === "en" ? "en-CA" : locale === "fr" ? "fr-CA" : locale;

  let formattedDate = dateObj.toLocaleDateString(adjustedLocale, {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  if (locale === "en") {
    const parts = formattedDate.split(" ");
    if (parts.length === 3) {
      formattedDate = `${parts[1]} ${parts[0]} ${parts[2]}`.replace(/,/g, "");
    }
  }

  return formattedDate;
};

export const formatString = (string: string) => {
  const firstLetter = string.charAt(0).toUpperCase();
  const remaining = string.slice(1).split("_").join(" ");
  return firstLetter + remaining;
};

export function formatPublicationType(type: string, locale: string) {
  if (locale === "en") {
    switch (type) {
      case "academic articles":
        return "Academic Article";
      case "conferences":
        return "Conference";
      case "reports":
        return "Report";
      default:
        return "Other";
    }
  } else if (locale === "fr") {
    switch (type) {
      case "academic articles":
        return "Article académique";
      case "conferences":
        return "Conférence";
      case "reports":
        return "Rapport";
      default:
        return "Autre";
    }
  } else {
    return "Unknown";
  }
}

export function formatDocumentType(type: string, locale: string) {
  if (locale === "en") {
    switch (type) {
      case "recruitment poster":
        return "Recruitment Poster";
      case "survey link":
        return "Survey Link";
      case "project website":
        return "Project Website";
      default:
        return "Other";
    }
  } else if (locale === "fr") {
    switch (type) {
      case "recruitment poster":
        return "Affiche de recrutement";
      case "survey link":
        return "Lien vers sondage";
      case "project website":
        return "Site web du project";
      default:
        return "Autre";
    }
  } else {
    return "Unknown";
  }
}

export function formatTeamPosition(type: string, locale: string) {
  if (locale === "en") {
    switch (type) {
      case "a - lead researcher":
        return "Lead Researcher";
      case "b -  phd student":
        return "PhD Student";
      case "c - masters student":
        return "Masters Student";
      default:
        return "Bachelor's Student";
    }
  } else if (locale === "fr") {
    switch (type) {
      case "a - lead researcher":
        return "Chercheur·se principal·e";
      case "b -  phd student":
        return "Étudiant·e au doctorat";
      case "c - masters student":
        return "Étudiant·e à la maîtrise";
      default:
        return "Étudiant·e au baccalauréat";
    }
  } else {
    return "Unknown";
  }
}
