import { describe, expect, it } from 'vitest'
import {
  compressPriorityRanges,
  formatMissingPriorityRanges,
  getMissingPriorities,
} from './priorities'

/**
 * Unit tests for priority utility behavior.
 */
describe('priority utilities', () => {
  it('returns missing priorities up to max used value', () => {
    expect(getMissingPriorities([1, 3, 5, 5, 7, 12])).toEqual([2, 4, 6, 8, 9, 10, 11])
  })

  it('compresses sorted and unsorted inputs into ranges', () => {
    expect(compressPriorityRanges([6, 4, 3, 2])).toEqual(['2-4', '6'])
  })

  it('formats compressed ranges for display', () => {
    expect(formatMissingPriorityRanges([2, 4, 6, 8, 9, 10, 11])).toBe('2, 4, 6, 8-11')
  })
})
