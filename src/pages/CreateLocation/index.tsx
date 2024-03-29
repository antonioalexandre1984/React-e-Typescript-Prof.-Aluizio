import { LeafletMouseEvent } from 'leaflet';
import React, { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { TileLayer, Marker, MapContainer } from 'react-leaflet';
import api from '../../services/api';
import logo from '../../assets/logo.svg';
import { FiArrowLeft } from 'react-icons/fi';
import './styles.css';
import Dropzone from '../../components/Dropzone/index';

interface Item {
    id: number;
    title: string;
    image_url: string;
}

const CreateLocation: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);

    const [selectedMapPosition, setSelectedMapPosition] = useState<[number, number]>([0, 0]);

    const [formData, setformData] = useState({
        name: '',
        email: '',
        whatsapp: '',
        city: '',
        uf: '',

    });

    const [selectedItems, setSelectedItems] = useState<number[]>([]);

    const [selectedFile, setselectedFile] = useState<File>();


    const history = useHistory();

    useEffect(() => {
        api.get('items').then(response => {
            setItems(response.data);
        })
    }, [])

    const handleMapClick = useCallback((event: LeafletMouseEvent): void => {
        //console.log(event);
        setSelectedMapPosition([
            event.latlng.lat,
            event.latlng.lng,
        ])
    }, []);

    const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        // console.log(event.target.name, event.target.value);
        const { name, value } = event.target;
        setformData({ ...formData, [name]: value });
    }, [formData])

    const handleSelectItem = useCallback((id: number) => {
        // setSelectedItems([...selectedItems, id]);
        const alreadySelected = selectedItems.findIndex(item => item === id);

        if (alreadySelected >= 0) {
            const filteredItems = selectedItems.filter(item => item !== id);
            setSelectedItems(filteredItems);
        } else {
            setSelectedItems([...selectedItems, id]);
        }
    }, [selectedItems]);

    const handleSubmit = useCallback(async (event: FormEvent) => {
        event.preventDefault();

        const { city, email, name, uf, whatsapp } = formData;
        const [latitude, longitude] = selectedMapPosition;
        const items = selectedItems;

        const data = new FormData();

        data.append('name', name);
        data.append('email', email);
        data.append('whatsapp', whatsapp);
        data.append('uf', uf);
        data.append('city', city);
        data.append('latitude', String(latitude));
        data.append('longitude', String(longitude));
        data.append('items', items.join(','));
        if (selectedFile) {
            data.append('image', selectedFile);
        }

        await api.post('locations', data);

        alert('Estabelecimento cadastrado com sucesso!');
        history.push('/');

    }, [formData, selectedItems, selectedMapPosition, history, selectedFile]);

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

                <form onSubmit={handleSubmit}>
                    <h1>Cadastro do<br />Local de coleta</h1>

                    <fieldset>
                        <legend>
                            <h2>Dados</h2>
                        </legend>

                        <Dropzone onFileUploaded={setselectedFile} />



                        <div className="field">
                            <label htmlFor="name">Nome da entidade</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="field-group">
                            <div className="field">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    onChange={handleInputChange}
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
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>
                            <h2>Endereço</h2>
                            <span>Marque o endereço no mapa</span>
                        </legend>
                        < MapContainer center={[-23.0003709, -43.365895]} zoom={8} onClick={handleMapClick}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={[-23.0003709, -43.365895]} />
                        </MapContainer>

                        <div className="field-group">
                            <div className="field">
                                <label htmlFor="city">Cidade</label>
                                <input
                                    type="text"
                                    name="city"
                                    id="city"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="field-group">
                                <div className="field">
                                    <label htmlFor="uf">Estado</label>
                                    <input
                                        type="text"
                                        name="uf"
                                        id="uf"
                                        onChange={handleInputChange}
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
                                <li
                                    key={item.id}
                                    onClick={() => handleSelectItem(item.id)}
                                    className={selectedItems.includes(item.id) ? 'selected' : ''}
                                >
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