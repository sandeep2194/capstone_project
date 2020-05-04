import { consolidate } from '../src/client/js/app';
import { date_diff_indays } from '../src/client/js/helpers';
import { addDays } from "../src/client/js/helpers";

describe("consolidate", () => {
    test('Check if we get added json', () => {
        let all_data = {}
        let c_data = {
            lat: "Poo"
        }
        let city = 'test';
        let output = {
            test: {
                lat: "Poo"
            }
        }
        consolidate(all_data, c_data, city)
        expect(all_data).toEqual(output)
    })
});

describe("date_diff_indays", () => {
    test('Check if we get no. days', () => {
        let today = new Date();
        let until = addDays(today, 3)
        expect(date_diff_indays(today, until)).toBe(3)
    })
})