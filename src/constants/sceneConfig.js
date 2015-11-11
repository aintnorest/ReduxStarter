import { spring } from 'react-motion';

export default {
    backdrop: {
        Enter: { x: 0, y: 0, z: 1, opacity:spring(0, [40, 40]) },
        Leave: { x: 0, y: 0, z: 1, opacity:spring(0, [40, 40]) },
        Styles(val) {
            return { x: 0, y: 0, z: 1, opacity: spring(val.opacity)};
        },
        VM() {
            return require("vms/backdrop")();
        }
    },
    card: {
        Enter: { x: spring(-100), y: 0, z: 2, opacity: 100 },
        Leave: { x: spring(-100), y: 0, z: 2, opacity: 100 },
        Styles(val) {
            return { x: spring(val.x), y: 0, z: 2, opacity: 100};
        },
        VM() {
            return require("vms/card")();
        }
    },
};
