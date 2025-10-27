import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useGeneralSettings } from "../hooks/useSettings";

// Fix default icon issue with Leaflet in React
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.setIcon(DefaultIcon);

function extractCoordinatesFromLink(link: string): [number, number] {
  try {
    const mParam = new URL(link).searchParams.get("m");
    if (!mParam) {
      throw new Error("No 'm' parameter found");
    }
    // Parse the format: "longitude,latitude" from "74.585221,42.882321/20"
    const parts = mParam.split("/")[0].split(",");
    const longitude = parseFloat(parts[0]);
    const latitude = parseFloat(parts[1]);

    if (isNaN(latitude) || isNaN(longitude)) {
      throw new Error("Invalid coordinates");
    }

    return [latitude, longitude]; // Leaflet uses [latitude, longitude]
  } catch (error) {
    console.error("Failed to extract coordinates from link:", error);
    // Fallback to default coordinates
    return [42.850329, 74.609962];
  }
}

export default function Map2Gis() {
  const { settings } = useGeneralSettings();
  const locationLink =
    settings?.location?.link ||
    "https://2gis.kg/bishkek/firm/70000001105358890/tab/info?m=74.585221%2C42.882321%2F20";
  const locationMarker: [number, number] =
    extractCoordinatesFromLink(locationLink);

  return (
    <MapContainer
      center={locationMarker}
      zoom={17}
      attributionControl={false}
      className="w-full h-[250px] md:h-[350px] rounded-lg shadow-lg"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={locationMarker}>
        <Popup keepInView={true}>
          <div className="text-center">
            <p className="font-semibold mb-2">Мы находимся здесь!</p>
            <a
              href={locationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              Открыть в 2GIS
            </a>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}
