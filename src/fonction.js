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

// export const lireTexte = (texte) => {
//     if (texte.trim() === "") {
//         alert("Veuillez entrer du texte à lire !");
//         return;
//     }
//     const utterance = new SpeechSynthesisUtterance(texte);
//     utterance.lang = "fr-FR"; // Langue française
//     utterance.pitch = 1;      // Tonalité normale
//     utterance.rate = 1.1;       // Vitesse normale
//     utterance.volume = 1;     // Volume maximal
//     speechSynthesis.speak(utterance);
// };

// Fonction principale pour lire du texte
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

// Fonction pour traiter les matricules
const traiterMatricule = (texte) => {
    return texte.replace(/\b([A-Za-z])(\d+)\b/g, (match, lettre, chiffres) => {
        // Enlever les zéros inutiles au début et garder le reste
        let chiffreFormate = chiffres.replace(/^0+/, ''); // Enlever les zéros de début

        // Si le nombre reste vide (par exemple 0000 -> ""), on remplace par "zéro"
        if (chiffreFormate === "") chiffreFormate = "0";

        // Si le nombre a plus de 2 chiffres, les diviser en groupes de 2
        let groupesDeDeux = [];
        for (let i = 0; i < chiffreFormate.length; i += 2) {
            groupesDeDeux.push(chiffreFormate.slice(i, i + 2));
        }

        // Si le nombre a moins de 3 chiffres, ne pas diviser
        if (chiffreFormate.length < 3) {
            groupesDeDeux = [chiffreFormate];
        }

        // Convertir chaque groupe en mots
        const nombreEnMots = groupesDeDeux.map(groupe => convertirChiffresEnMots(groupe)).join(" ");

        return `${lettre} ${nombreEnMots}`;
    });
};

// Fonction pour convertir un nombre en mots
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

    // Si le nombre est inférieur ou égal à 20, il est directement trouvé dans la map
    if (nombre <= 20) {
        return chiffresEnMots[nombre] || nombre;
    }

    // Si le nombre est plus grand, c'est une dizaine, on ajoute les unités
    let mots = [];

    // Les dizaines
    let dizaines = Math.floor(nombre / 10) * 10;
    if (dizaines > 0) {
        mots.push(chiffresEnMots[dizaines]);
    }

    // Les unités
    let unites = nombre % 10;
    if (unites > 0) {
        mots.push(chiffresEnMots[unites]);
    }

    return mots.join("-");
};








