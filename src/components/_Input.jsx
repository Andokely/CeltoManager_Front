import React from 'react';
import PropTypes from 'prop-types';
import { _BtnIconeED } from './_Bouton';
import { FaSearch, FaHome } from "react-icons/fa";

export const _TextInput = ({
    type = 'text',
    name,
    placeholder = '',
    value = '',
    onChange = () => { },
    labelLabel = '',
    disabled = false, // Nouvelle propriété avec une valeur par défaut
}) => {
    return (
        <div className='flex flex-col mb-4'>
            <label htmlFor={name} className='mb-2' style={{ color: 'var(--text-color)' }}>
                {labelLabel}:
            </label>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                disabled={disabled} // Ajout de la gestion du mode "disabled"
                className={`px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                style={{ backgroundColor: 'var(--primary-1)', borderColor: 'var(--border-color)' }}
            />
        </div>
    );
};

_TextInput.propTypes = {
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    labelLabel: PropTypes.string,
    disabled: PropTypes.bool, // Déclaration de la nouvelle propriété
};

export const _DateInput = ({
    name,
    placeholder = '',
    value = '',
    onChange = () => { },
    labelLabel = '',
}) => {
    return (
        <div className='flex flex-col mb-4'>
            <label htmlFor={name} className='mb-2' style={{ color: 'var(--text-color)' }}>
                {labelLabel}:
            </label>
            <input
                type="date"
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700"
                style={{ backgroundColor: 'var(--primary-1)', borderColor: 'var(--border-color)' }}
            />
        </div>
    );
};

_DateInput.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    labelLabel: PropTypes.string,
};

export const _DateInput2 = ({
    name,
    placeholder = '',
    value = '',
    onChange = () => { },
    labelLabel = '',
}) => {
    return (
        <div className='flex'>
            <input
                type="date"
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700"
                style={{ backgroundColor: 'var(--primary-1)', borderColor: 'var(--border-color)' }}
            />
        </div>
    );
};

_DateInput2.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    labelLabel: PropTypes.string,
};

export const _PasswordInput = ({
    type = 'text',
    name,
    placeholder = '',
    value = '',
    onChange = () => { },
    labelLabel = '',
    showPassword = false
}) => {
    return (
        <div className='flex flex-col mb-4'>
            <label htmlFor={name} className='mb-2' style={{ color: 'var(--text-color)' }}>
                {labelLabel}:
            </label>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700"
                style={{ backgroundColor: 'var(--primary-1)', borderColor: 'var(--border-color)' }}
            />
            <button
                type="button"
                // onClick={togglePasswordVisibility}
                className='absolute inset-y-0 right-0 flex items-center px-3'
            >
                {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z" /></svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" /></svg>
                )}
            </button>
        </div>
    );
};

_PasswordInput.propTypes = {
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    labelLabel: PropTypes.string,
    showPassword: PropTypes.bool
};

export const _IntInput = ({
    name,
    placeholder = '',
    value = '',
    onChange = () => { },
    labelLabel = '',
    disabled = false,
    min,
    max,
    step = 1,
}) => {
    return (
        <div className='flex flex-col mb-4'>
            <label htmlFor={name} className='mb-2' style={{ color: 'var(--text-color)' }}>
                {labelLabel}:
            </label>
            <input
                type="number"
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                disabled={disabled}
                min={min}
                max={max}
                step={step}
                className={`px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                style={{ backgroundColor: 'var(--primary-1)', borderColor: 'var(--border-color)' }}
            />
        </div>
    );
};

_IntInput.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
    labelLabel: PropTypes.string,
    disabled: PropTypes.bool,
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
};

export const _InputSearch = ({
    name,
    placeholder = '',
    value = '',
    onChange = () => { },
    onClickSearch = () => { },
    className = '',

}) => {
    return (
        <>
            <div className={`flex ${className}`}>
                <input
                    type={"text"}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className="px-4 py-1 mr-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700"
                    style={{ backgroundColor: 'var(--primary-3)', color: 'var(--text-color)' }}
                />
                <div className="mr-7">
                    <_BtnIconeED
                        onClick={onClickSearch}
                        width={24}
                        height={24}
                        Icon={FaSearch}
                        className={'text-green-500'}
                        fill={'#2072AF'}
                    />
                </div>
            </div>
        </>
    )
};

_InputSearch.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
    onClickSearch: PropTypes.func,
};

