import { ReactElementType } from "./types";
import fs from "fs";
import { Compare } from "ts-nodash";
import { decycle, retrocycle } from "./Cycle";

const snapshots: {[key:string]:number} = {};

const makeSnapshot = (elemToSnapshot: Cheerio, snapshotName: string) => {
    const snapPath = `./snapshots`;
    if (!fs.existsSync(snapPath)) {
        fs.mkdirSync(snapPath);
    }
    fs.writeFileSync(`${snapPath}/${snapshotName}`, serialize(elemToSnapshot));
}

const readSnapshot = (snapshotName: string): any => {
    const snapPath = `./snapshots`;
    if (!fs.existsSync(snapPath)) {
        return "";
    }
    return fs.readFileSync(`${snapPath}/${snapshotName}`).toString();
}

const serialize = (snapshotElem: Cheerio) => {
    return JSON.stringify(decycle(snapshotElem));
}

export function Snapshot(snapshotElem: Cheerio, label?: string) {
    const rootType = label || 
        snapshotElem.attr('id') ||
        snapshotElem.attr('name') ||
        snapshotElem.get(0).tagName;
    const key = (snapshots[rootType]) ? ++snapshots[rootType] : 0;
    const snapshotName = `${rootType}-${key}.snap`;
    if (process.env.SNAPSHOT)
        makeSnapshot(snapshotElem, snapshotName);

    const storedSnap = readSnapshot(snapshotName);
    return storedSnap === serialize(snapshotElem);
}
