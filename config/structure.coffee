# Read more about app structure at http://docs.appgyver.com

module.exports =

  # See styling options for tabs and other native components in app/common/native-styles/ios.css or app/common/native-styles/android.css
  # tabs: [
  #   {
  #     title: "Trends"
  #     id: "trend"
  #     location: "trends#index" # Supersonic module#view type navigation
  #   }
  #   {
  #     title: "Search"
  #     id: "search"
  #     location: "search#index"
  #   }
  # ]

  rootView:
    location: "trends#index"

  preloads: [
    {
      id: "learn-more"
      location: "example#learn-more"
    }
    {
      id: "using-the-scanner"
      location: "example#using-the-scanner"
    }
    {
      id: "posts"
      location: "trends#posts"
    }
  ]

  drawers:
    left:
      id: "leftDrawer"
      location: "trends#drawer"
      showOnAppLoad: false
    options:
      animation: "swingingDoor"
  
  # initialView:
  #   id: "initialView"
  #   location: "example#initial-view"
