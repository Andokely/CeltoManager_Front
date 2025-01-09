import PropTypes from "prop-types";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';


export const _Cellule = ({ valeur }) => {

    return (
        <div className={"flex flex-col justify-left px-5 py-2 items-left"}>
            <span>{valeur}</span>
        </div>
    );
};

_Cellule.propTypes = {
    valeur: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export const _CellulePhoto = ({ valeur }) => {
    return (
        <>
            <div className={"flex flex-col justify-center items-center"}>
                <LazyLoadImage
                    className="w-8 h-auto rounded-full"
                    src={`/profil/${valeur ? valeur : "x.jpeg"}`}
                    alt="Profil"
                    effect="blur"
                    loading="lazy"
                />
            </div>
        </>
    )
};

_CellulePhoto.propTypes = {
    valeur: PropTypes.string,
};





