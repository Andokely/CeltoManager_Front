export const decodeToken = (token) => {
    try {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split("")
                .map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
                .join("")
        );
        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error("Erreur lors du décodage du token :", error);
        return null;
    }
};

export const convertirDateEnFormatFrancais = (dateISO) => {
    const date = new Date(dateISO);

    const jour = date.getDate().toString().padStart(2, '0');
    const mois = (date.getMonth() + 1).toString().padStart(2, '0');
    const annee = date.getFullYear();

    return `${jour}/${mois}/${annee}`;
}

export const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
}

export const getCurrentDateISO = () => {
    const now = new Date();
    return now.toISOString();
}

export const limiterCaractere = (text, maxLength) => {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
    }
    return text;
}

export const lireTexte = (texte, rate = 1, pitch = 1, volume = 1, voice = null) => {
    if (texte.trim() === "") {
        alert("Veuillez entrer du texte à lire !");
        return;
    }

    // Traiter le texte des matricules avant de le passer au lecteur
    const texteTransformé = traiterMatricule(texte);

    const utterance = new SpeechSynthesisUtterance(texteTransformé);

    // Paramètres de personnalisation
    utterance.lang = "fr-FR"; // Langue française
    utterance.rate = rate;    // Vitesse de lecture
    utterance.pitch = pitch;  // Tonalité
    utterance.volume = volume; // Volume

    // Choisir une voix spécifique si elle est définie
    if (voice) {
        utterance.voice = voice;
    }

    // Lancer la lecture
    speechSynthesis.speak(utterance);
};

const traiterMatricule = (texte) => {
    return texte.replace(/\b([A-Za-z])(\d+)\b/g, (match, lettre, chiffres) => {
        let chiffreFormate = chiffres.replace(/^0+/, '');

        if (chiffreFormate === "") chiffreFormate = "0";

        let groupesDeDeux = [];
        for (let i = 0; i < chiffreFormate.length; i += 2) {
            groupesDeDeux.push(chiffreFormate.slice(i, i + 2));
        }

        if (chiffreFormate.length < 3) {
            groupesDeDeux = [chiffreFormate];
        }

        const nombreEnMots = groupesDeDeux.map(groupe => convertirChiffresEnMots(groupe)).join(" ");

        return `${lettre} ${nombreEnMots}`;
    });
};

const convertirChiffresEnMots = (nombre) => {
    const chiffresEnMots = {
        "0": "zéro",
        "1": "un",
        "2": "deux",
        "3": "trois",
        "4": "quatre",
        "5": "cinq",
        "6": "six",
        "7": "sept",
        "8": "huit",
        "9": "neuf",
        "10": "dix",
        "11": "onze",
        "12": "douze",
        "13": "treize",
        "14": "quatorze",
        "15": "quinze",
        "16": "seize",
        "17": "dix-sept",
        "18": "dix-huit",
        "19": "dix-neuf",
        "20": "vingt",
        "30": "trente",
        "40": "quarante",
        "50": "cinquante",
        "60": "soixante",
        "70": "soixante-dix",
        "80": "quatre-vingts",
        "90": "quatre-vingt-dix"
    };

    if (nombre <= 20) {
        return chiffresEnMots[nombre] || nombre;
    }

    let mots = [];

    let dizaines = Math.floor(nombre / 10) * 10;
    if (dizaines > 0) {
        mots.push(chiffresEnMots[dizaines]);
    }

    let unites = nombre % 10;
    if (unites > 0) {
        mots.push(chiffresEnMots[unites]);
    }

    return mots.join("-");
};

export const formatMinuteEnHeure = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours > 0) {
        return `${hours}h ${remainingMinutes}m`;
    } else {
        return `${remainingMinutes}m`;
    }
};








