import { cookie } from '../library/cookie.js'

function addItim(id, num, price, titleType) {
    let shop = cookie.get('shop');
    let product = {
        id: id,
        price: price,
        num: num,
        titleType: titleType
    };
    if (shop) {
        shop = JSON.parse(shop)
        if (shop.some(elm => elm.id == id)) {

            shop.forEach(elm => {
                if (elm.id == id) {
                    elm.num = product.num
                }
            });
        } else {
            shop.push(product)
        }
    } else {
        shop = [];
        shop.push(product)
    }
    cookie.set('shop', JSON.stringify(shop), 1)
    $()
}

export default addItim;