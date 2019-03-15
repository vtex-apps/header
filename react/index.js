import React, { Fragment, useEffect, useLayoutEffect, useState } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { ExtensionPoint, useRuntime } from 'vtex.render-runtime'
import TopMenu from './components/TopMenu'
import Spacer from './components/Helpers/Spacer'
import { logo, collapsible, icons, searchBar, login } from './defaults'

import styles from './store-header.css'
import useDevice from './hooks/useDevice'

/**
 * Main header component
 */
const Header = ({
  leanWhen,
  linkUrl,
  logoUrl,
  logoTitle,
  logoSize,
  showSearchBar,
  showLogin,
  iconClasses,
  labelClasses,
  collapsibleAnimation,
}) => {
  const { page } = useRuntime()
  const { mobile } = useDevice()
  const [containerHeight, setContainerHeight] = useState(null)

  useEffect(() => {
    if (document) {
      const containerElement = document.querySelector('.vtex-store-header-2-x-container')
      const elementHeight = containerElement && containerElement.offsetHeight
      setContainerHeight(elementHeight)
    }
  })

  const topMenuOptions = {
    linkUrl,
    logoUrl,
    logoTitle,
    logoSize,
    showSearchBar,
    showLogin,
    iconClasses,
    labelClasses,
    collapsibleAnimation,
    mobile,
  }

  const isLeanMode = () => {
    const acceptedPaths = new RegExp(leanWhen)
    return acceptedPaths.test(page)
  }

  const containerClasses = classNames(
    styles.container,
    'fixed top-0 z-4 w-100',
    isLeanMode() ? styles.leanMode : ''
  )

  return (
    <Fragment>
      <div className={containerClasses}>
        <TopMenu
          {...topMenuOptions}
          leanMode={isLeanMode()}
          extraHeaders={
            <div
              className="left-0 w-100"
              style={{
                transform: 'translateZ(0)', //Avoid shaking
              }}
            >
              <ExtensionPoint id="telemarketing" />
              <ExtensionPoint id="menu-link" />
            </div>
          }
        />
      </div>
      <Spacer containerHeight={containerHeight} />
    </Fragment>
  )
}

Header.propTypes = {
  /** Cases in which the menu is in lean mode */
  leanWhen: PropTypes.string,
  ...login.propTypes,
  ...searchBar.propTypes,
  ...icons.propTypes,
  ...logo.propTypes,
  ...collapsible.propTypes,
}

Header.defaultProps = {
  leanWhen: 'a^',
  ...login.defaultProps,
  ...searchBar.defaultProps,
  ...icons.defaultProps,
  ...logo.defaultProps,
  ...collapsible.defaultProps,
}

Header.schema = {
  title: 'editor.header.title',
  description: 'editor.header.description',
  type: 'object',
  properties: {
    logoUrl: {
      type: 'string',
      title: 'editor.header.logo.image',
      widget: {
        'ui:widget': 'image-uploader',
      },
    },
    linkUrl: {
      type: 'string',
      title: 'editor.header.link.url',
    },
    showSearchBar: {
      title: 'editor.header.show.searchbar.title',
      type: 'boolean',
      default: true,
      isLayout: true,
    },
    showLogin: {
      title: 'editor.header.show.login.title',
      type: 'boolean',
      default: true,
      isLayout: true,
    },
  },
}

export default Header
