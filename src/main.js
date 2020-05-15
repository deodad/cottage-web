import "./styles.css"
import { me } from "./api"

const req = me()

import("./mount").then(({ mount }) => mount(req))
