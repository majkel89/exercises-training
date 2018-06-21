describe('class', () => {

	it('has a constructor for initialization', () => {
		class Musician {
			constructor(instrument){
				this.instrument = instrument;
			}
		}

		const musician = new Musician()
		const ringo = new Musician('drums')

		expect(musician.instrument).toBeUndefined()
		expect(ringo.instrument).toBe('drums')
	})

	it('constructor can have default param values', () => {
		class Musician {
			constructor(instrument = 'guitar'){
				this.instrument = instrument;
			}
		}

		const john = new Musician()
		const ringo = new Musician('drums')

		expect(john.instrument).toBe('guitar')
		expect(ringo.instrument).toBe('drums')
	})

	it('can have instance methods', () => {
		class Musician {
			constructor(instrument = 'guitar'){
				this.instrument = instrument;
			}
			play(){
				return `I'm playing ${this.instrument}`
			}
		}

		const musician = new Musician('drums')

		expect(musician.play).toBeDefined()
		expect(Musician.play).toBeUndefined()
		expect(musician.play()).toBe("I'm playing drums")
	})

	it('can have static methods and properties', () => {
		class Musician {
			constructor(instrument = 'guitar'){
				this.instrument = instrument;
			}
			static create(instrument){
				var m = new Musician(instrument);
				Musician.instances.push(m);
				return m;
			}
		}
		Musician.instances = [];

		expect(Musician.create).toBeDefined()
		expect(Musician.instances.length).toBe(0)

		const john = Musician.create()
		expect(john.create).toBeUndefined()
		expect(Musician.instances.length).toBe(1)

		const ringo = Musician.create('drums')
		expect(ringo.create).toBeUndefined()
		expect(Musician.instances.length).toBe(2)
	})

	it('can extend another class', () => {
		class Musician {
			constructor(instrument = 'guitar'){
				this.instrument = instrument;
			}
			play(){
				return `I'm playing ${this.instrument}`
			}
		}

		class Rockman extends Musician {}

		const rockman = new Rockman()

		expect(rockman instanceof Rockman).toBe(true)
		expect(rockman instanceof Musician).toBe(true)
		expect(rockman.play()).toBe("I'm playing guitar")
	})

	it('can use property setters and getters', () => {
		class Musician {
			constructor(instrument = 'guitar'){
				this.instrument = instrument;
			}
			get description(){
				return `this musician plays ${this.instrument}`
			}
		}

		const guitarist = new Musician('guitar')
		const drummer = new Musician('drums')
		expect(guitarist.description).toBe('this musician plays guitar')
		expect(drummer.description).toBe('this musician plays drums')
	})

	it('can use property setters and getters', () => {
		class Musician {
			constructor(){
				this.bands = [];
			}
			set band(value){
				this.bands.push(value)
			}
			get allBands(){
				return `this musician played in ${this.bands.join(', ')}`
			}
		}

		const musician = new Musician()
		musician.band = 'ABBA'
		expect(musician.allBands).toBe('this musician played in ABBA')
		musician.band = 'Rolling Stones'
		expect(musician.allBands).toBe('this musician played in ABBA, Rolling Stones')
		musician.band = 'Iron Maiden'
		expect(musician.allBands).toBe('this musician played in ABBA, Rolling Stones, Iron Maiden')
	})
})
