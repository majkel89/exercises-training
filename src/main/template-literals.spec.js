describe('Template literals', () => {

	it('should support string interpolation', () => {
		const personPL = {
			name: 'Jarosław',
			friends: ['Antoni', 'Andrzej', 'Krystyna', 'Wiktor']
		}
		const personEN = {
			name: 'Darren',
			friends: ['Greg', 'Sebastian', 'Chloe']
		}

		const friendsStr = person => `${person.name} has ${person.friends.length} friends: ${person.friends.join(', ')}`

		expect(friendsStr(personPL)).toBe(
			'Jarosław has 4 friends: Antoni, Andrzej, Krystyna, Wiktor'
		)
		expect(friendsStr(personEN)).toBe(
			'Darren has 3 friends: Greg, Sebastian, Chloe'
		)
	})

	it('should support multi-line strings', () => {
		const multiLine = `
        Oh
        my
        dear
        so much fun!`
		expect(multiLine).toBe('\n        Oh\n        my\n        dear\n        so much fun!')
	})

	it('should support string escaping', () => {
		expect(`Hi\nthere!`).toBe('Hi\nthere!')
		expect(`This is \`escaped\` backtics`).toBe('This is `escaped` backtics')
	})

	it('should call the tagging function', () => {
		const noun = 'World'
		const emotion = 'happy'
		const hello = tagIt`Hello ${noun}! Are you feeling ${emotion} today?`
		expect(hello).toBe('Hello dear World! Are you feeling really happy today?')

		const name = 'John'
		const action = 'take a seat'
		const result = tagIt`Welcome ${name}, feel comfortable and ${action}!`
		expect(result).toBe('Welcome dear John, feel comfortable and really take a seat!')

		function tagIt(literalString, ...interpolatedParts) {
			return `${literalString[0]}dear ${interpolatedParts[0]}${literalString[1]}really ${interpolatedParts[1]}${literalString[2]}`
		}
	})

	it('can be curried', () => {
		let journey =
			first =>
				second =>
					third => `${first}, then ${second} and finally ${third}!`

		expect(journey `Warsaw` `Poznan` `Berlin`).toBe('Warsaw, then Poznan and finally Berlin!')
		expect(journey `Poland` `Czech` `Austria`).toBe('Poland, then Czech and finally Austria!')
		expect(journey `Europe` `Asia` `Australia`).toBe('Europe, then Asia and finally Australia!')
	})

})
