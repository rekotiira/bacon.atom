import * as R    from "ramda"
import Bacon     from "baconjs"
import P, * as L from "partial.lenses"

function ignore() {}

function set(value) { this.modify(() => value) }

function getLens() { return L.get(this.mapper, this.parent.get()) }
function modifyLens(x2x) { this.parent.modify(L.modify(this.mapper, x2x)) }

function lens(l, ...ls) {
  const mapper = P(l, ...ls)

  const atom = this.map(L.get(mapper)).skipDuplicates(R.equals)

  atom.parent = this
  atom.mapper = mapper
  atom.modify = modifyLens
  atom.get = getLens
  atom.set = set
  atom.lens = lens
  atom.view = lens

  return atom
}

function getRoot() { return this.value }
function modifyRoot(x2x) { this.bus.push(x2x) }

export default value => {
  const bus = Bacon.Bus()
  const atom = bus.scan(value, (v, fn) => atom.value = fn(v)).skipDuplicates(R.equals)

  atom.subscribe(ignore)

  atom.value = value
  atom.bus = bus
  atom.modify = modifyRoot
  atom.get = getRoot
  atom.set = set
  atom.lens = lens
  atom.view = lens

  return atom
}
