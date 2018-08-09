class Stopwatch extends React.Component {
	constructor(display, results, copies) {
		super();
        this.running = false;
        this.display = display;
        this.reset();
        this.print(this.times);
        this.copies = [];
        this.results = results;
    }
    start() {
    	if (!this.running) {
        	this.running = true;
        	this.watch = setInterval(() => this.step(), 10);
    	}
	}

    reset() {
        this.times = {
            minutes: 0,
            seconds: 0,
            miliseconds: 0
        };
	}
	zero() {
		this.reset();
		this.print();
	}
	step() {
    	if (!this.running) return;
    	this.calculate();
    	this.print();
	}
	print() {
        this.display.innerText = this.format(this.times);
	}
	format(times) {
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
	}
	calculate() {
    	this.times.miliseconds += 1;
    	if (this.times.miliseconds >= 100) {
        	this.times.seconds += 1;
        	this.times.miliseconds = 0;
    	}
    	if (this.times.seconds >= 60) {
        	this.times.minutes += 1;
        	this.times.seconds = 0;
    	}
	}
	stop() {
    	this.running = false;
    	clearInterval(this.watch);
	}
	copy() {
		this.copies.push(this.format(this.times));
		this.printCopies();
	}
	printCopies() {
		this.results.innerText = '';
        let list = document.createDocumentFragment();
        this.copies.forEach((copy) => {
            let element = document.createElement('li');
            element.innerHTML = copy;
            list.appendChild(element);
        });
        this.results.appendChild(list);
	}
	  clear() {
        this.copies = [];
        this.printCopies();
    }

    render() {
		return React.createElement('div', {},
			React.createElement('div', {className: 'controls'},
				React.createElement('button', {onClick: () => this.start()}, 'start'),
				React.createElement('button', {onClick: () => this.stop()}, 'stop'),
				React.createElement('button', {onClick: () => this.reset()}, 'reset'),
				React.createElement('button', {onClick: () => this.copy()}, 'copy'),),
			React.createElement('div', {className:'stopwatch'}),
			React.createElement('div', {className: 'outcome'},
				React.createElement('button', {onClick: () => this.clear()}, 'clear'),
				React.createElement('ul', {className:'results'}),),
		)
}

}

function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}


/*const stopwatch = new Stopwatch(document.querySelector('.stopwatch'), document.querySelector('.results'));

let startButton = document.getElementById('start');
startButton.addEventListener('click', () => stopwatch.start());

let stopButton = document.getElementById('stop');
stopButton.addEventListener('click', () => stopwatch.stop());

let resetButton = document.getElementById('reset');
resetButton.addEventListener('click', () => stopwatch.zero());

let copyButton = document.getElementById('copy');
copyButton.addEventListener('click', () => stopwatch.copy());

let clearButton = document.getElementById('clear');
clearButton.addEventListener('click', () => stopwatch.clear());*/

var element = React.createElement(Stopwatch);
ReactDOM.render(element, document.getElementById('app'));

