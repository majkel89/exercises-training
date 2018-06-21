describe('const declarations', () => {

	it('cannot modify the value of a `const` variable', () => {
		const releaseName = 'ES6'

		expect(releaseName).toEqual('ES6')
	})

	it('are perfect for function declarations', () => {
		const myFn = () => 'training'

		expect(myFn()).toEqual('training')
	})

})
