import React from "react";
import { Block, Elem } from "../../../utils/bem";
import "./Button.styl";

export const Button = React.forwardRef(
  (
    {
      children,
      type,
      extra,
      className,
      href,
      size,
      waiting,
      icon,
      tag,
      look,
      ...rest
    },
    ref
  ) => {
    const finalTag = tag ?? href ? "a" : "button";

    const mods = {
      size,
      waiting,
      type,
      look,
      withIcon: !!icon,
      withExtra: !!extra,
      disabled: !!rest.disabled,
    };

    const iconElem = React.useMemo(() => {
      if (!icon) return null;

      switch (size) {
        case "small":
          return React.cloneElement(icon, { ...icon.props, size: 12 });
        case "compact":
          return React.cloneElement(icon, { ...icon.props, size: 14 });
        default:
          return icon;
      }
    }, [icon, size]);

    return (
      <Block
        ref={ref}
        name="button"
        tag={finalTag}
        mod={mods}
        mix={className}
        type={type}
        {...rest}
      >
        <>
          {iconElem && (
            <Elem tag="span" name="icon">
              {iconElem}
            </Elem>
          )}
          {iconElem && children ? <span>{children}</span> : children}
          {extra !== undefined ? <Elem name="extra">{extra}</Elem> : null}
        </>
      </Block>
    );
  }
);
Button.displayName = "Button";

Button.Group = ({ className, children, collapsed }) => {
  return (
    <Block name="button-group" mod={{ collapsed }} mix={className}>
      {children}
    </Block>
  );
};