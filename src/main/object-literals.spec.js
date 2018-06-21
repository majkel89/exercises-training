describe('enhanced object literals', () => {

	it('can use shorthand for property names', () => {

		function createBeatle(name, dead) {
			return {
				type: 'Musician',
				name,
				dead,
				wantsToPlayWith(target){
					return `${this.name} wants to play with ${target.name} ${target.dead ? 'but he is' : 'and he is not'} dead`;
				}
			}
		}

		const john = createBeatle('John', true)
		const paul = createBeatle('Paul', false)
		const george = createBeatle('George', false)

		expect(paul.name).toBe('Paul')
		expect(john.dead).toBe(true)
		expect(george.type).toBe('Musician')
		expect(paul.wantsToPlayWith(john)).toBe('Paul wants to play with John but he is dead')
		expect(paul.wantsToPlayWith(george)).toBe('Paul wants to play with George and he is not dead')
	})
})
