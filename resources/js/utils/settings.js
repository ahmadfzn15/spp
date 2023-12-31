export function useSetting() {
    const color = localStorage.getItem("color") ?? "blue";
    const sidebar = localStorage.getItem("sidebar");

    const setBarRight = () => {
        localStorage.setItem("sidebar", "true");
    };

    const setBarLeft = () => {
        localStorage.setItem("sidebar", "false");
    };

    const setColor = (color) => {
        localStorage.setItem("color", color);
    };

    return { color, sidebar, setBarRight, setBarLeft, setColor };
}

export const accentColor = [
    "red",
    "yellow",
    "green",
    "blue",
    "pink",
    "purple",
    "blue-gray",
];
