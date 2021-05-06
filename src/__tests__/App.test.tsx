import React from 'react'
import ReactDOM from 'react-dom'
import {
    render, fireEvent, cleanup
} from '@testing-library/react'
import TestRenderer from 'react-test-renderer';
// import App from '../App'
import { Sample } from '../Sample'

// // describe('Parent', () => {
// // 	afterEach(() => {
// // 			cleanup();
// // 			jest.resetModules();
// // 	});
// // 	describe('First describe', () => {
// // 		const wrapper = render(<App />);

// // 		it('First test', () => {
// // 			console.log(wrapper.debug());
// // 		});
// // 	});

// // 	describe('Second describe', () => {
// // 		render(<App />);
// // 	});
// // });
// test("renders the correct content", () => {
// 	const root = document.createElement('div')
// 	ReactDOM.render(<Sample />, root)
// 	expect(root.querySelector('h2')?.textContent).toBe("Hello world")
// })
// export const testsum = (a: number, b: number): number => {
// 	return a+b
// }

// test('two plus two', () => {
// 	const value = 2 + 2
// 	expect(value).toBe(4)
// })
it('render Sample', () => {
	const tree = TestRenderer
    .create(<a href="http://www.facebook.com">Facebook</a>)
    .toJSON();
  expect(tree).toMatchSnapshot();
})