const script = import.meta.filename;
const inputFile = script.split(".")[0] + "-t.txt";
const input = Bun.file(inputFile);

const text = await input.text();

function run() {
    const start = performance.now();

    let dial = 50;
    const lines = text.split("\n");

    let mult, add, sum = 0;
    for (const line of lines) {
        mult = line.at(0)! === "L" ? -1 : 1;
        add = Number(line.trim().slice(1));
        const delta = add % 100;
        dial += delta * mult;

        let hundreds = Math.floor(delta / 100);
        if (dial % 100 === 0) {
            hundreds -= 1;
        }

        if (dial <= 0 || dial > 99) {
            sum += 1;
        }

        sum += hundreds;
        dial += hundreds * 100 * (-1 * mult);
    }

    const diff = performance.now() - start;
    return {
        result: sum,
        time: diff
    }
}

console.log(script.replace(".txt", "").split("\\").at(-1));
const { result, time } = run();
console.log(`Sum: ${result}`);
/*console.log("Measuring...");

let sumTime = 0;
const runCount = 10000;
for (let i = 0; i < runCount; i++) {
    const runTime = run().time;
    sumTime += runTime;
}
console.log((sumTime / runCount).toFixed(2) + "ms per run");
*/