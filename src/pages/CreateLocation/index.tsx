import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TileLayer, Marker, Map } from 'react-leaflet';
import api from '../../services/api';
import logo from '../../assets/logo.svg';
import { FiArrowLeft } from 'react-icons/fi';
import './styles.css';

interface Item {
    id: number;
    title: string;
    image_url: string;
}

const CreateLocation: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        api.get('items').then(response => {
            setItems(response.data);
        })
    }, [])


    return (
        <div id="page-create-location">
            <div className='content'>
                <header>
                    <img src={logo} alt="Coleta Seletiva" />
                    <Link to="/">
                        <FiArrowLeft />
                        voltar para home
                    </Link>
                </header>

                <form>
                    <h1>Cadastro do<br />Local de coleta</h1>

                    <fieldset>
                        <legend>
                            <h2>Dados</h2>
                        </legend>
                        <div className="field">
                            <label htmlFor="name">Nome da entidade</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                            />
                        </div>
                        <div className="field-group">
                            <div className="field">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                />
                            </div>
                        </div>
                        <div className="field">
                            <div className="field">
                                <label htmlFor="Whatsapp">Whatsapp</label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                />
                            </div>
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>
                            <h2>Endereço</h2>
                            <span>Marque o endereço no mapa</span>
                        </legend>
                        <Map center={[-23.0003709, -43.365895]} zoom={14}>
                            <TileLayer
                                attribution='&amp;copy<a href="http://osm.org/copyright">OpenStreetMap</a>contributors'
                                url="http://{s}.title.openstreetmap.org/{z}/{x}/{y}.png" />
                            <Marker position={[-23.0003709, -43.365895]} />
                        </Map>
                        <div className="field-group">
                            <div className="field">
                                <label htmlFor="city">Cidade</label>
                                <input
                                    type="text"
                                    name="city"
                                    id="city"
                                />
                            </div>
                            <div className="field-group">
                                <div className="field">
                                    <label htmlFor="uf">Estado</label>
                                    <input
                                        type="text"
                                        name="uf"
                                        id="uf"
                                    />
                                </div>
                            </div>
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>
                            <h2>Itens coletados</h2>
                            <span>Você pode marcar um ou mais itens</span>
                        </legend>
                        <ul className="items-grid">
                            {items.map(item => (
                                <li key={item.id}>
                                    <img src={item.image_url} alt={item.title} />
                                </li>
                            ))}

                        </ul>
                    </fieldset>

                    <button type="submit">
                        Cadastrar local de coleta
                    </button>
                </form>
            </div>
        </div >
    );
}
export default CreateLocation;