import PropTypes from "prop-types";
import { Tabs, TabsHeader, Tab } from "@material-tailwind/react";

const _Menu = ({
    tabs,
    onTabClick,
    orientation = "horizontal"
}) => {
    return (
        <Tabs
            value="default"
            orientation={orientation}
            className={`backdrop-blur-sm animate-slideInUp shadow-xl z-10`}
        >
            <TabsHeader
                className={`rounded-lg min-h-[calc(4vh+20px)] shadow-md`}
                style={{ backgroundColor: "var(--primary-3)" }}
            >
                {tabs.map((tab, index) => (
                    <div className="px-1" key={index}>
                        <Tab
                            value={tab.value}
                            onClick={() => onTabClick(tab.value)}
                            activeClassName="bg-[#6CB4EE] text-red-500"
                            className={`py-1 font-bold rounded-lg hover:bg-[#6CB4EE] hover:text-white transition-all duration-300 ease-in-out`}
                            style={{ backgroundColor: "var(--primary-1)", color: "var(--text-color)" }}
                        >
                            {tab.label}
                        </Tab>
                    </div>
                ))}
            </TabsHeader>
        </Tabs>
    );
};

_Menu.propTypes = {
    tabs: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            label: PropTypes.string.isRequired,
        })
    ).isRequired,
    onTabClick: PropTypes.func,
    orientation: PropTypes.oneOf(["horizontal", "vertical"]),
    mt: PropTypes.string,
    p: PropTypes.string,
    px: PropTypes.string,
    my: PropTypes.string,
};

_Menu.defaultProps = {
    onTabClick: () => { },
};

export default _Menu;
