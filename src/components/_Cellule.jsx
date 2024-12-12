import PropTypes from "prop-types";

export const _Cellule = ({ valeur }) => {

    return (
        <div className={"flex flex-col justify-left px-5 py-2 items-left"}>
            <span>{valeur}</span>
        </div>
    );
};

_Cellule.propTypes = {
    valeur: PropTypes.string,
};

export const _CellulePhoto = ({ valeur }) => {
    return (
        <>
            <div className={"flex flex-col justify-left px-5 py-2 items-left"}>
                <img className="w-8 h-auto rounded-full" src={`/profil/${valeur ? valeur : 'x.jpeg'}`} alt="" srcset="" />
            </div>
        </>
    )
};

_CellulePhoto.propTypes = {
    valeur: PropTypes.string,
};



