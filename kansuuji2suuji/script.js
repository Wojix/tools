const kanjiNums = ["零","一","二","三","四","五","六","七","八","九"];
const kanjiUnits = ["","十","百","千"];
const bigUnits = ["","万","億","兆","京","垓","𥝱","穣","溝","澗","正","載","極","恒河沙","阿僧祇","那由他","不可思議","無量大数"];

function kanjiToNumber(kanji) {
    let total = 0n, section = 0n, num = 0n;
    for (let char of kanji) {
        if (kanjiNums.includes(char)) num = BigInt(kanjiNums.indexOf(char));
        else if (kanjiUnits.includes(char)) { section += (num||1n)*10n**BigInt(kanjiUnits.indexOf(char)); num=0n; }
        else { const idx=bigUnits.indexOf(char); if(idx!==-1){section+=num; total+=section*10n**BigInt(4*idx); section=0n; num=0n;} }
    }
    return (total+section+num).toString();
}

function numberToKanji(input) {
    let num = BigInt(input), str = "", unitPos = 0;
    if(num===0n) return "零";
    while(num>0n){
        let section = num%10000n;
        if(section!==0n){
            let sectionStr="", innerUnit=0, s=section;
            while(s>0n){ let n=s%10n; if(n!==0n) sectionStr=kanjiNums[Number(n)]+kanjiUnits[innerUnit]+sectionStr; innerUnit++; s/=10n; }
            str=sectionStr+bigUnits[unitPos]+str;
        }
        unitPos++;
        num/=10000n;
    }
    str=str.replace(/^一(?=[万億兆京垓𥝱穣溝澗正載極恒河沙阿僧祇那由他不可思議無量大数])/,"");
    str=str.replace(/一十/g,"十");
    return str;
}

function convert(input){
    if(/^[0-9]+$/.test(input)) return numberToKanji(input);
    return kanjiToNumber(input);
}

document.getElementById("input").addEventListener("input",()=>{
    const input=document.getElementById("input").value.trim();
    document.getElementById("result").textContent=input?convert(input):"";
});
