# Evaly Helper Extension

> _An Extension to make your life a little bit easier when shopping on evaly._

### **Extension in action**

> **_invoice list_**

![invoice list page](https://i.imgur.com/698siC6.jpg)

> **_Order Status_**

![order status](https://i.imgur.com/5gOA9ek.jpg)

> **_Sidebar_**

![sidebar](https://i.imgur.com/CxgHuzM.jpg)

> **_Displaying discount information_ [Discontinued]**

![Extension in action](https://i.imgur.com/OXKj2a0.png)

-   On cashback campaign products page it will display various cashback/discount information relative to the product so you don't have to do the calculations (math is hard 😑)

*   Clicking on extension will fetch all of your orders (1000 is current limit) (cancelled and pending orders are filtered by default)

-   Store all order information on your browser for offline access

*   Sort / Filter your order by price, date, staus(processing, picked etc.)

-   Check Balance directly from the extension and claim cashback if any is available.

*   Get notified when you have pending cashback ready to claim.

-   Get notified when an order status is updated.

---

## [Install Here](https://chrome.google.com/webstore/detail/evaly-helper/ohaenmhffheomihbnbhffiehdgegegcg)

---

## Contributing

-   fork and clone the repo

*   Run `**yarn install**`

-   Run `**yarn dev**`

*   Open _`chrome://extensions`_ on your browser and Enable developer mode

-   Click _`load unpacked`_ and select your folder which you cloned

*   Get Cracking and open PR/Issues 👏

---

## FAQ

-   **Do you collect any data from the user?**

*   No, Every functionality of the extension is implemented in the extension itself, it does not make any network request to any third party servers. The extension does not use any third party tracking tool [google analytics] either. All external network requests are made to **api.evaly.com.bd** domain.

---

## Public Feature Roadmap

-   Show a notification badge if there is a new order or if any existing order has been updated [done]

*   Allow user to filter order by their status (shipped/processing etc) [done]

-   Show user profile and balance [added balance]

*   Offer customization/preferences for various extension behaviour to the user [todo]

-   Allow sorting orders by date/price [done]

### **Feel free to open an issue if you are looking for a specific feature that is not on this checklist and not implemented yet**

## License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

-   **[MIT license](http://opensource.org/licenses/mit-license.php)**
