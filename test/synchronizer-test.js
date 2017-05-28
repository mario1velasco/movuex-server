import { test } from 'babel-tap'
import { Synchronizer } from '../workers/sync/synchronizer'
import { mockData } from './mockData/mockData'
const sinon = require('sinon')
const sinonStubPromise = require('sinon-stub-promise')

sinonStubPromise(sinon)

const getNetwork = () => {
  return {
    name: 'CBS',
    countryCode: 'US'
  }
}

test('should exist Synchronizer class', (t) => {
  t.ok(Synchronizer, 'should exist')
  t.equals(typeof Synchronizer, 'function', 'should be a function')
  t.end()
})

test('should exist Synchronizer class', (t) => {
  t.ok(Synchronizer, 'should exist')
  t.equals(typeof Synchronizer, 'function', 'should be a function')
  t.end()
})

test('should return all document with image', (t) => {
  const result = mockData.filter(Synchronizer.hasImage)
  t.equals(mockData.length, 2)
  t.equals(result.length, 1, 'should return one document')
  t.end()
})

test('should retrieve the language', (t) => {
  const document = mockData[0]
  const language = Synchronizer.getLanguage(document)
  t.equals(language, 'EN')
  t.end()
})

test('should retrieve the premiered', (t) => {
  const document = mockData[0]
  const premiered = Synchronizer.getPremiered(document)
  t.same(premiered, new Date('2013-06-24'))
  t.end()
})

test('should retrieve the rating', (t) => {
  const document = mockData[0]
  const externalRating = Synchronizer.getRating(document)
  t.equals(externalRating, 6.6)
  t.end()
})

test('should retrieve the default rating', (t) => {
  const document = mockData[1]
  const externalRating = Synchronizer.getRating(document)
  t.equals(externalRating, 0)
  t.end()
})

test('should retrieve the network', (t) => {
  const document = mockData[0]
  const network = Synchronizer.getNetwork(document)
  t.same(network, getNetwork())
  t.end()
})

test('should retrieve the default values for network empty', (t) => {
  const document = mockData[1]
  const network = Synchronizer.getNetwork(document)
  t.same(network, {
    name: 'empty',
    countryCode: ''
  })
  t.end()
})

test('must return data according to the domain', (t) => {
  const document = mockData[0]
  const data = Synchronizer.transformDataToDomain(document)
  const result = {
    network: getNetwork(),
    externalRating: 6.6,
    premiered: new Date('2013-06-24'),
    language: 'EN',
    showId: document.id,
    name: document.name,
    externalUrl: document.url,
    genres: document.genres,
    status: document.status,
    schedule: document.schedule,
    image: document.image
  }
  t.same(data, result)
  t.end()
})
