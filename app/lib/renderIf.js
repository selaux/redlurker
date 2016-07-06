import R from 'ramda';

export default function renderIf(predicate, element, otherwise = R.always(null)) {
    const predicateValue = typeof predicate === 'function' ? predicate() : predicate;

    return predicateValue ? element() : otherwise();
}
