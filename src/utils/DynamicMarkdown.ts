const delimiter:string = '°';

export function dynamicMarkdown (pInput:string, pMap:Map<string, string>):string {
    for (const lItem of pMap.keys()) {
        pInput = pInput.replace(delimiter + lItem + delimiter, pMap.get(lItem));
    }
    return pInput;
}