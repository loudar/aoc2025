const script = import.meta.filename;
const inputFile = script.split(".")[0] + ".txt";
const input = Bun.file(inputFile);

const text = await input.text();

function run() {
    const start = performance.now();

    let dial = 50;
    const lines = text.split("\n");

    let mult, sum = 0;
    for (const line of lines) {
        mult = line.at(0)! === "L" ? -1 : 1;
        dial += Number(line.slice(1)) * mult;

        if (dial % 100 === 0) {
            sum += 1;
        }
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
console.log("Measuring...");

let sumTime = 0;
const runCount = 10000;
for (let i = 0; i < runCount; i++) {
    const runTime = run().time;
    sumTime += runTime;
}
console.log((sumTime / runCount).toFixed(2) + "ms per run");
