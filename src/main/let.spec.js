describe('let declarations', () => {

	const noop = () => {}

	it('can be used in place of `var`', () => {
		let musician = 'John Lennon'
		let isDead = true
		expect(musician).toBe('John Lennon')
		expect(isDead).toBe(true)
	})

	it('can modify the value of a `let` variable', () => {
		let releaseName = 'ES6'
		releaseName = 'ES2015'
		expect(releaseName).toBe('ES2015')
	})

	it('is trapped inside of an `if` statement', () => {
		if (true) {
			let b = 1
		}
		expect(() => noop(b)).toThrow()
	})

	it('cannot redeclare using the same name', () => {
		function doLoop() {
			for (let i = 0; i < 10; i++) {
				// empty loop content
			}
			return i
		}

		expect(doLoop).toThrow()
	})

	it('enable to use block statements', () => {
		// BLOCK STATEMENT
		{
			let d = 2
		}

		expect(() => noop('d', d)).toThrow()
	})

	it('enable to use nested block statements', () => {

		// NESTED BLOCK STATEMENTS
		let message = 'John'
		expect(message).toBe('John')
		{
			let message = 'Lennon'
			expect(message).toBe('Lennon')
			{
				let message = 'died'
				expect(message).toBe('died')
			}
			expect(message).toBe('Lennon')
		}
		expect(message).toBe('John')
	})
})
