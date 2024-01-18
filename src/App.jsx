import './App.css';
import { useState } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import { ToastContainer, toast } from 'react-toastify';
import apiClient from "./api-client";
import patternBgDesktop from './assets/pattern-bg-desktop.jpg';
import iconArrow from './assets/icon-arrow.svg'
import loader from './assets/loader.svg'
import "leaflet/dist/leaflet.css";
import 'react-toastify/dist/ReactToastify.css';
import { validateIPaddress } from './helper/isIPAddress.js';

function App() {
  const [ipSearchValue, setIpSearchValue] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [IPData, setIPData] = useState({});
  const [position, setPosition] = useState([51.505, -0.09]);
  const onClick = async () => {
    setLoading(true);
    const queryFieldName = validateIPaddress(ipSearchValue) ? 'ipAddress' : 'domain';
    try {
      const data = await apiClient.getIPInfo(queryFieldName, ipSearchValue);
      setPosition([data.location.lat, data.location.lng])
      setIPData(data);
    } catch (error) {
      toast.error('Please enter a valid IP address or domain.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="app-container">
        <div className="header-section">
          <img
            loading="lazy"
            src={patternBgDesktop}
            className="img"
          />
          <div className="header-section-container">
            <span className="heading">IP Address Tracker</span>
            <div className='search-block'>
              <input
                className="search-inbox"
                placeholder='Search for any IP address or domain'
                value={ipSearchValue}
                onChange={(e) => {
                  setIpSearchValue(e.target.value);
                }}
              />
              <button
                className='search-button'
                onClick={onClick}
                disabled={!ipSearchValue}
              >
                <img src={isLoading ? loader : iconArrow}/>
              </button>
            </div>
          </div>
        </div>
        <div className="map-section">
          <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{height: "100vh", width: "100vw"}}>
            <ChangeView center={position} zoom={13} />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer>
          {IPData.ip && (
            <div className="ip-info-absolute">
              <div className="ip-info-wrapper">
                <div className="ip-info-content">
                  <div className="ip-info-row">
                    <div className="ip-info-column">
                      <span className="ip-info">
                        <span className="ip-info-column-name">IP ADDRESS</span>
                        <span className="ip-info-column-value">{IPData.ip}</span>
                      </span>
                    </div>
                    <div className="ip-info-column">
                      <div className="ip-info">
                        <div className="ip-info-column-name">LOCATION</div>
                        <div className="ip-info-column-value">{IPData.location.city}, {IPData.location.country}</div>
                      </div>
                    </div>
                    <div className="ip-info-column">
                      <div className="ip-info">
                        <div className="ip-info-column-name">TIMEZONE</div>
                        <div className="ip-info-column-value">UTC {IPData.location.timezone}</div>
                      </div>
                    </div>
                    <div className="ip-info-column">
                      <div className="ip-info">
                        <div className="ip-info-column-name">ISP</div>
                        <div className="ip-info-column-value">
                              {IPData.isp}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

export default App
